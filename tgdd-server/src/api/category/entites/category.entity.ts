import { BrandEntity } from '@/api/brand/entities/brand.entity';
import { Uuid } from '@/common/types/common.type';
import { CATEGORY } from '@/constants/product.constant';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation
} from 'typeorm';

@Entity('category')
export class CategoryEntity extends AbstractEntity {
  constructor(data?: Partial<CategoryEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_category_id',
  })
  id!: Uuid;

  @Column({ type: 'enum', enum:CATEGORY, default:CATEGORY.UNKNOWN})
  name!: string;

  @Column({ nullable: false })
  slug!: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;

  @OneToMany(() => BrandEntity, (brand) => brand.category)
  brands: Relation<BrandEntity[]>;
}
