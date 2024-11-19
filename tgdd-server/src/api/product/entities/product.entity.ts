import { DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Uuid } from '@/common/types/common.type';
import { AbstractEntity } from '@/database/entities/abstract.entity';

@Entity('product')
export class ProductEntity extends AbstractEntity {
  constructor(data?: Partial<ProductEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_product_id' })
  id!: Uuid;


  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;

}
