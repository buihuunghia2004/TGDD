import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from './entites/product.entity';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }
}
