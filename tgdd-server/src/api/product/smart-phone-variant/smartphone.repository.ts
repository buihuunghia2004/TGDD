import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SmartPhoneVariantEntity } from './entities/smartphone-variant.enity';

@Injectable()
export class SmartPhoneRepository extends Repository<SmartPhoneVariantEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(SmartPhoneVariantEntity, dataSource.createEntityManager());
  }
}
