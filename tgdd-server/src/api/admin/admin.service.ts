import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { ErrorCode } from '@/constants/error-code.constant';
import { ValidationException } from '@/exceptions/validation.exception';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { FindOptionsSelect, Repository } from 'typeorm';
import { AdminEntity } from './entities/admin.entity';
import { CreateAdminReqDto } from './dto/create-admin.req.dto';
import { ADMIN_RES_FIELDS, AdminResDto } from './dto/admin.res.dto';
import { JwtPayloadType } from '../auth/types/jwt-payload.type';
import { ListAdminReqDto } from './dto/list-admin.req.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { paginate } from '@/utils/offset-pagination';
import { OffsetPaginationDto } from '@/common/dto/offset-pagination/offset-pagination.dto';

@Injectable()
export class AdminService {
  private readonly logger = new Logger(AdminService.name);

  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  // async findAll(reqDto:ListAdminReqDto): Promise<OffsetPaginatedDto<AdminResDto>>{
  //   const query = this.adminRepository
  //   .createQueryBuilder('admin')
  //   .orderBy('admin.createdAt', 'DESC')
  //   .relation(AdminEntity, 'roles')

  //   // .relation(AdminEntity, 'roles')
  //   const [admins, metaDto] = await paginate<AdminEntity>(query, reqDto, {
  //     skipCount: false,
  //     takeAll: false,
  //   });
  //   return new OffsetPaginatedDto(plainToInstance(AdminResDto, admins), metaDto);
  // }

  async findAll(reqDto:ListAdminReqDto): Promise<OffsetPaginatedDto<AdminResDto>>{
    console.log('reqDto',reqDto);
    
    const [admins,count] = await this.adminRepository.findAndCount({
      select: ADMIN_RES_FIELDS as FindOptionsSelect<AdminEntity>,
      relations: ['roles'],
      ...reqDto._options
    })

    const metaDto = new OffsetPaginationDto(count, reqDto);
    return new OffsetPaginatedDto<AdminResDto>(plainToInstance(AdminResDto,admins), metaDto);
  }

  async create(dto: CreateAdminReqDto, creatorId: string):Promise<AdminResDto> {
    const { username, email, password, image } = dto;
    // check uniqueness of username/email
    const admin = await this.adminRepository.findOne({
      where: [
        {
          username,
        }
      ],
    });

    if (admin) {
      throw new ValidationException(ErrorCode.E001);
    }

    const newUser = new AdminEntity({
      username,
      email,
      password,
      image,
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    const savedUser = await this.adminRepository.save(newUser);
    this.logger.debug(savedUser);

    return plainToInstance(AdminResDto, savedUser);
  }

  //getme
  //findone
  
  //update
  //delete
}
