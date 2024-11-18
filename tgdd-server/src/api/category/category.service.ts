import { CursorPaginationDto } from '@/common/dto/cursor-pagination/cursor-pagination.dto';
import { CursorPaginatedDto } from '@/common/dto/cursor-pagination/paginated.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { ErrorCode } from '@/constants/error-code.constant';
import { ValidationException } from '@/exceptions/validation.exception';
import { buildPaginator } from '@/utils/cursor-pagination';
import { paginate } from '@/utils/offset-pagination';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import assert from 'assert';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entites/category.entity';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly CategoryRepository: Repository<CategoryEntity>,
  ) {}

  // async create(dto: CreateUserReqDto): Promise<UserResDto> {
  //   const { username, email, password, image } = dto;

  //   // check uniqueness of username/email
  //   const user = await this.userRepository.findOne({
  //     where: [
  //       {
  //         username,
  //       },
  //       {
  //         email,
  //       },
  //     ],
  //   });

  //   if (user) {
  //     throw new ValidationException(ErrorCode.E001);
  //   }

  //   const newUser = new UserEntity({
  //     username,
  //     email,
  //     password,
  //     image,
  //     createdBy: SYSTEM_USER_ID,
  //     updatedBy: SYSTEM_USER_ID,
  //   });

  //   const savedUser = await this.userRepository.save(newUser);
  //   this.logger.debug(savedUser);

  //   return plainToInstance(UserResDto, savedUser);
  // }

  // async findAll(
  //   reqDto: ListUserReqDto,
  // ): Promise<OffsetPaginatedDto<UserResDto>> {
  //   const query = this.userRepository
  //     .createQueryBuilder('user')
  //     .orderBy(reqDto._sort[0], reqDto._sort[1])
  //     // .select(reqDto._only);
  //   const [users, metaDto] = await paginate<UserEntity>(query, reqDto, {
  //     skipCount: false,
  //     takeAll: false,
  //   });
  //   return new OffsetPaginatedDto(plainToInstance(UserResDto, users), metaDto);
  // }

  // async loadMoreUsers(
  //   reqDto: LoadMoreUsersReqDto,
  // ): Promise<CursorPaginatedDto<UserResDto>> {
  //   const queryBuilder = this.userRepository.createQueryBuilder('user');
  //   const paginator = buildPaginator({
  //     entity: UserEntity,
  //     alias: 'user',
  //     paginationKeys: ['createdAt'],
  //     query: {
  //       limit: reqDto.limit,
  //       order: 'DESC',
  //       afterCursor: reqDto.afterCursor,
  //       beforeCursor: reqDto.beforeCursor,
  //     },
  //   });

  //   const { data, cursor } = await paginator.paginate(queryBuilder);

  //   const metaDto = new CursorPaginationDto(
  //     data.length,
  //     cursor.afterCursor,
  //     cursor.beforeCursor,
  //     reqDto,
  //   );

  //   return new CursorPaginatedDto(plainToInstance(UserResDto, data), metaDto);
  // }

  // async findOne(id: Uuid): Promise<UserResDto> {
  //   assert(id, 'id is required');
  //   const user = await this.userRepository.findOneByOrFail({ id });

  //   return user.toDto(UserResDto);
  // }

  // async update(id: Uuid, updateUserDto: UpdateUserReqDto) {
  //   const user = await this.userRepository.findOneByOrFail({ id });

  //   user.image = updateUserDto.image;
  //   user.updatedBy = SYSTEM_USER_ID;

  //   await this.userRepository.save(user);
  // }

  // async remove(id: Uuid) {
  //   await this.userRepository.findOneByOrFail({ id });
  //   await this.userRepository.softDelete(id);
  // }
}
