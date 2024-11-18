import { IEmailJob, IVerifyEmailJob } from '@/common/interfaces/job.interface';
import { Uuid } from '@/common/types/common.type';
import { Branded } from '@/common/types/types';
import { AllConfigType } from '@/config/config.type';
import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { CacheKey } from '@/constants/cache.constant';
import { ErrorCode } from '@/constants/error-code.constant';
import { JobName, QueueName } from '@/constants/job.constant';
import { ValidationException } from '@/exceptions/validation.exception';
import { createCacheKey } from '@/utils/cache.util';
import { verifyPassword } from '@/utils/password.util';
import { InjectQueue } from '@nestjs/bullmq';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { Cache } from 'cache-manager';
import { plainToInstance } from 'class-transformer';
import crypto from 'crypto';
import ms from 'ms';
import { Repository } from 'typeorm';
import { SessionEntity } from '../user/entities/session.entity';
import { UserEntity } from '../user/entities/user.entity';
import { AdminLoginReqDto, UserLoginReqDto } from './dto/login.req.dto';
import { LoginResDto } from './dto/login.res.dto';
import { RefreshReqDto } from './dto/refresh.req.dto';
import { RefreshResDto } from './dto/refresh.res.dto';
import { RegisterReqDto } from './dto/register.req.dto';
import { RegisterResDto } from './dto/register.res.dto';
import { JwtPayloadType } from './types/jwt-payload.type';
import { JwtRefreshPayloadType } from './types/jwt-refresh-payload.type';
import { AdminEntity } from '../admin/entities/admin.entity';
import { UserDto } from '../user/dto/user.dto';
import { UserResDto } from '../user/dto/user.res.dto';

type Token = Branded<
  {
    accessToken: string;
    refreshToken: string;
    tokenExpires: number;
  },
  'token'
>;

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<AllConfigType>,
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    @InjectQueue(QueueName.EMAIL)
    private readonly emailQueue: Queue<IEmailJob, any, string>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  /**
   * Sign in user
   * @param dto LoginReqDto
   * @returns LoginResDto
   */

  async adminLogin(dto: AdminLoginReqDto): Promise<LoginResDto> {        
    const { username, password } = dto;
    const user = await this.adminRepository.findOne({
      where: { username },
      relations: ['roles'],
      select: ['id', 'email', 'password', 'roles'],
    });    

    const isPasswordValid =
      user && (await verifyPassword(password, user.password));

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    
    const session = new SessionEntity({
      hash,
      adminId: user.id,
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    await session.save();

    console.log('user', user);
    
    const userDto = user.toDto(UserDto);

    console.log('userDto', userDto);

    const token = await this.createToken({
      id: userDto.id,
      roles: userDto.roles,
      username: dto.username,
      sessionId: session.id,
      hash,
    });

    return plainToInstance(LoginResDto, {
      userId: user.id,
      ...token,
    });
  }
  async userLogin(dto: UserLoginReqDto): Promise<LoginResDto> {
    const { email, password } = dto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    const isPasswordValid =
      user && (await verifyPassword(password, user.password));

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const hash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    const session = new SessionEntity({
      hash,
      userId: user.id,
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });
    await session.save();

    const userDto = user.toDto(UserDto);
    const token = await this.createToken({
      id: userDto.id,
      roles: userDto.roles,
      username: userDto.username,
      sessionId: session.id,
      hash,
    });

    return plainToInstance(LoginResDto, {
      userId: user.id,
      ...token,
    });
  }

  async register(dto: RegisterReqDto): Promise<RegisterResDto> {
    // Check if the user already exists
    const isExistUser = await UserEntity.exists({
      where: { email: dto.email },
    });

    if (isExistUser) {
      throw new ValidationException(ErrorCode.E003);
    }

    // Register user
    const user = new UserEntity({
      email: dto.email,
      password: dto.password,
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    await user.save();

    // Send email verification
    const token = await this.createVerificationToken({ id: user.id });
    const tokenExpiresIn = this.configService.getOrThrow(
      'auth.confirmEmailExpires',
      {
        infer: true,
      },
    );
    await this.cacheManager.set(
      createCacheKey(CacheKey.EMAIL_VERIFICATION, user.id), //key
      token, //value
      ms(tokenExpiresIn), //ttl
    );
    await this.emailQueue.add(
      JobName.EMAIL_VERIFICATION,
      {
        email: dto.email,
        token,
      } as IVerifyEmailJob,
      { attempts: 3, backoff: { type: 'exponential', delay: 60000 } },
    );

    return plainToInstance(RegisterResDto, {
      userId: user.id,
    });
  }

  async logout(userToken: JwtPayloadType): Promise<void> {
    await this.cacheManager.store.set<boolean>(
      createCacheKey(CacheKey.SESSION_BLACKLIST, userToken.sessionId),
      true,
      userToken.exp * 1000 - Date.now(),
    );
    await SessionEntity.delete(userToken.sessionId);
  }

  async refreshToken(dto: RefreshReqDto): Promise<RefreshResDto> {
    const { sessionId, hash } = this.verifyRefreshToken(dto.refreshToken);
    const session = await SessionEntity.findOneBy({ id: sessionId });

    if (!session || session.hash !== hash) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOneOrFail({
      where: { id: session.userId },
      select: ['id'],
    });
    const userDto = user.toDto(UserDto);

    const newHash = crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');

    SessionEntity.update(session.id, { hash: newHash });

    return await this.createToken({
      id: userDto.id,
      roles: userDto.roles,
      username: userDto.username,
      sessionId: session.id,
      hash: newHash,
    });
  }

  async verifyAccessToken(token: string): Promise<JwtPayloadType> {
    let payload: JwtPayloadType;
    try {
      payload = this.jwtService.verify(token, {
        secret: this.configService.getOrThrow('auth.secret', { infer: true }),
      });
    } catch {
      throw new UnauthorizedException();
    }

    // Force logout if the session is in the blacklist
    const isSessionBlacklisted = await this.cacheManager.store.get<boolean>(
      createCacheKey(CacheKey.SESSION_BLACKLIST, payload.sessionId),
    );

    if (isSessionBlacklisted) {
      throw new UnauthorizedException();
    }

    return payload;
  }

  private verifyRefreshToken(token: string): JwtRefreshPayloadType {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.getOrThrow('auth.refreshSecret', {
          infer: true,
        }),
      });
    } catch {
      throw new UnauthorizedException();
    }
  }

  private async createVerificationToken(data: { id: string }): Promise<string> {
    return await this.jwtService.signAsync(
      {
        id: data.id,
      },
      {
        secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
          infer: true,
        }),
        expiresIn: this.configService.getOrThrow('auth.confirmEmailExpires', {
          infer: true,
        }),
      },
    );
  }
  public async getIdFromToken(token: string): Promise<string> {
    console.log(token);

    try {
      // Giải mã token và trả về id
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow('auth.confirmEmailSecret', {
          infer: true,
        }),
      });
      return decoded.id; // Trả về id người dùng
    } catch (error) {
      // Nếu token không hợp lệ hoặc bị lỗi, ném lỗi
      throw new Error('Invalid or expired token');
    }
  }

  private async createToken(data: {
    id: string;
    roles:string[];
    username:string;
    sessionId: string;
    hash: string;
  }): Promise<Token> {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });
    const tokenExpires = Date.now() + ms(tokenExpiresIn);

    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          id: data.id,
          roles: data.roles,
          username: data.username,
          sessionId: data.sessionId,
        },
        {
          secret: this.configService.getOrThrow('auth.secret', { infer: true }),
          expiresIn: tokenExpiresIn,
        },
      ),
      await this.jwtService.signAsync(
        {
          sessionId: data.sessionId,
          hash: data.hash,
        },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
      tokenExpires,
    } as Token;
  }

  public async verifyEmail(token: string): Promise<void> {
    // Check if the token is valid
    const id = (await this.getIdFromToken(token)) as Uuid;
    const user = await UserEntity.findOneBy({ id });
    if (!user) {
      throw new NotFoundException();
    }

    // Check if the user is already verified
    const cacheKey = createCacheKey(CacheKey.EMAIL_VERIFICATION, id);

    const isVerified = await this.cacheManager.get<string>(cacheKey);

    if (!isVerified) {
      throw new BadRequestException();
    }

    // Mark the user as verified
    await this.cacheManager.del(
      createCacheKey(CacheKey.EMAIL_VERIFICATION, id),
    );
    // user.isVerified = true;
    await user.save();
  }
}
