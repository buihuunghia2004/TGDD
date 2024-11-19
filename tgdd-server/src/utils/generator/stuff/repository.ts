`import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { yxxEntity } from './entites/entity';

@Injectable()
export class yxxRepository extends Repository<yxxEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(yxxEntity, dataSource.createEntityManager());
  }
}
`