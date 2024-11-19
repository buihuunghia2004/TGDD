`import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { ErrorCode } from '@/constants/error-code.constant';
import { ValidationException } from '@/exceptions/validation.exception';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import assert from 'assert';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { yxxEntity } from './entites/xxx.entity';
import { CreateyxxReqDto } from './dto/create-xxx.req.dto';
import { yxxResDto } from './dto/xxx.res.dto';
import { ListyxxReqDto } from './dto/list-xxx.req.dto';
import { OffsetPaginationDto } from '@/common/dto/offset-pagination/offset-pagination.dto';
import { UpdateyxxReqDto } from './dto/update-xxx.req.dto';

@Injectable()
export class yxxService {
  private readonly logger = new Logger(yxxService.name);

  constructor(
    @InjectRepository(yxxEntity)
    private readonly xxxRepository: Repository<yxxEntity>,
  ) {}

  async create(dto: CreateyxxReqDto): Promise<yxxResDto> {
    const { name } = dto;

    const xxx = await this.xxxRepository.findOne({
      where: {name}
    });

    if (xxx) {
      throw new ValidationException(ErrorCode.E001);
    }

    const newyxx = new yxxEntity({
      name,
      slug: name.toLowerCase(),
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
    });

    const savedyxx = await this.xxxRepository.save(newyxx);
    this.logger.debug(savedyxx);

    return plainToInstance(yxxResDto, savedyxx);
  }

  async findAll(reqDto:ListyxxReqDto): Promise<OffsetPaginatedDto<yxxResDto>>{
    console.log('reqDto',reqDto);
    
    const [entities,count] = await this.xxxRepository.findAndCount({
      ...reqDto._options
    })

    const metaDto = new OffsetPaginationDto(count, reqDto);
    return new OffsetPaginatedDto<yxxResDto>(plainToInstance(yxxResDto,entities), metaDto);
  }

  async findOne(id: Uuid): Promise<yxxResDto> {
    assert(id, 'id is required');
    const xxx = await this.xxxRepository.findOneByOrFail({ id });
    return xxx.toDto(yxxResDto);
  }

  async update(id: Uuid, updateyxxDto: UpdateyxxReqDto ) {
    const xxx = await this.xxxRepository.findOneByOrFail({ id });

    xxx.name = updateyxxDto.name;
    xxx.slug = updateyxxDto.name.toLowerCase();
    xxx.updatedBy = SYSTEM_USER_ID;

    await this.xxxRepository.save(xxx);
  }

  async remove(id: Uuid) {
    await this.xxxRepository.findOneByOrFail({ id });
    await this.xxxRepository.softDelete(id);
  }
}
`