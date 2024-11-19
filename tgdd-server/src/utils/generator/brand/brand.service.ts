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
import { BrandEntity } from './entites/brand.entity';
import { CreateBrandReqDto } from './dto/create-brand.req.dto';
import { BrandResDto } from './dto/brand.res.dto';
import { ListBrandReqDto } from './dto/list-brand.req.dto';
import { OffsetPaginationDto } from '@/common/dto/offset-pagination/offset-pagination.dto';
import { UpdateBrandReqDto } from './dto/update-brand.req.dto';

@Injectable()
export class BrandService {
  private readonly logger = new Logger(BrandService.name);

  constructor(
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  async create(dto: CreateBrandReqDto): Promise<BrandResDto> {
    const { name } = dto;

    const brand = await this.brandRepository.findOne({
      where: {name}
    });

    if (brand) {
      throw new ValidationException(ErrorCode.E001);
    }

    const newBrand = new BrandEntity({
      name,
      slug: name.toLowerCase(),
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    const savedBrand = await this.brandRepository.save(newBrand);
    this.logger.debug(savedBrand);

    return plainToInstance(BrandResDto, savedBrand);
  }

  async findAll(reqDto:ListBrandReqDto): Promise<OffsetPaginatedDto<BrandResDto>>{
    console.log('reqDto',reqDto);
    
    const [entities,count] = await this.brandRepository.findAndCount({
      ...reqDto._options
    })

    const metaDto = new OffsetPaginationDto(count, reqDto);
    return new OffsetPaginatedDto<BrandResDto>(plainToInstance(BrandResDto,entities), metaDto);
  }

  async findOne(id: Uuid): Promise<BrandResDto> {
    assert(id, 'id is required');
    const brand = await this.brandRepository.findOneByOrFail({ id });
    return brand.toDto(BrandResDto);
  }

  async update(id: Uuid, updateBrandDto: UpdateBrandReqDto ) {
    const brand = await this.brandRepository.findOneByOrFail({ id });

    brand.name = updateBrandDto.name;
    brand.slug = updateBrandDto.name.toLowerCase();
    brand.updatedBy = SYSTEM_USER_ID;

    await this.brandRepository.save(brand);
  }

  async remove(id: Uuid) {
    await this.brandRepository.findOneByOrFail({ id });
    await this.brandRepository.softDelete(id);
  }
}