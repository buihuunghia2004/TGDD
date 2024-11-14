import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { ErrorCode } from '@/constants/error-code.constant';
import { ValidationException } from '@/exceptions/validation.exception';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { AdminEntity } from './entities/admin.entity';
import { CreateAdminReqDto } from './dto/create-admin.req.dto';
import { AdminResDto } from './dto/admin.res.dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
  ) {}

  async create(dto: CreateAdminReqDto):Promise<AdminResDto> {
    const { username, email, password, bio, image } = dto;
    // check uniqueness of username/email
    const admin = await this.adminRepository.findOne({
      where: [
        {
          username,
        },
        {
          email,
        },
      ],
    });

    if (admin) {
      throw new ValidationException(ErrorCode.E001);
    }

    const newUser = new AdminEntity({
      username,
      email,
      password,
      bio,
      image,
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    const savedUser = await this.adminRepository.save(newUser);
    this.logger.debug(savedUser);

    return plainToInstance(AdminResDto, savedUser);
  }
}
