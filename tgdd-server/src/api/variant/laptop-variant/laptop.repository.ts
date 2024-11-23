import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { LaptopVariantEntity } from './entities/laptop-variant.entity';

@Injectable()
export class LaptopRepository extends Repository<LaptopVariantEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(LaptopVariantEntity, dataSource.createEntityManager());
  }
}
