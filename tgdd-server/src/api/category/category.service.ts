import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { ErrorCode } from '@/constants/error-code.constant';
import { ValidationException } from '@/exceptions/validation.exception';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import assert from 'assert';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entites/category.entity';
import { CreateCategoryReqDto } from './dto/create-category.req.dto';
import { CategoryResDto } from './dto/category.res.dto';
import { ListCategoryReqDto } from './dto/list-category.req.dto';
import { OffsetPaginationDto } from '@/common/dto/offset-pagination/offset-pagination.dto';
import { UpdateCategoryReqDto } from './dto/update-category.req.dto';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(dto: CreateCategoryReqDto): Promise<CategoryResDto> {
    const { name } = dto;

    const category = await this.categoryRepository.findOne({
      where: {name}
    });

    if (category) {
      throw new ValidationException(ErrorCode.E001);
    }

    const newUser = new CategoryEntity({
      name,
      slug: name.toLowerCase(),
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    const savedCategory = await this.categoryRepository.save(newUser);
    this.logger.debug(savedCategory);

    return plainToInstance(CategoryResDto, savedCategory);
  }

  async findAll(reqDto:ListCategoryReqDto): Promise<OffsetPaginatedDto<CategoryResDto>>{
    console.log('reqDto',reqDto);
    
    const [entities,count] = await this.categoryRepository.findAndCount({
      ...reqDto._options
    })

    const metaDto = new OffsetPaginationDto(count, reqDto);
    return new OffsetPaginatedDto<CategoryResDto>(plainToInstance(CategoryResDto,entities), metaDto);
  }

  async findOne(id: Uuid): Promise<CategoryResDto> {
    assert(id, 'id is required');
    const user = await this.categoryRepository.findOneByOrFail({ id });
    return user.toDto(CategoryResDto);
  }

  async update(id: Uuid, updateCategoryDto: UpdateCategoryReqDto ) {
    const category = await this.categoryRepository.findOneByOrFail({ id });

    category.name = updateCategoryDto.name;
    category.slug = updateCategoryDto.name.toLowerCase();
    category.updatedBy = SYSTEM_USER_ID;

    await this.categoryRepository.save(category);
  }

  async remove(id: Uuid) {
    await this.categoryRepository.findOneByOrFail({ id });
    await this.categoryRepository.softDelete(id);
  }
}
