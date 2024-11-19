import { DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Uuid } from '@/common/types/common.type';
import { AbstractEntity } from '@/database/entities/abstract.entity';

@Entity('brand')
export class BrandEntity extends AbstractEntity {
  constructor(data?: Partial<BrandEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_brand_id' })
  id!: Uuid;


  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;

}
