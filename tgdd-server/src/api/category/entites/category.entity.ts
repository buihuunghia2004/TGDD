import { BrandEntity } from '@/api/brand/entities/brand.entity';
import { ProductEntity } from '@/api/product/entities/product.entity';
import { Uuid } from '@/common/types/common.type';
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

  @Column({ nullable: false })
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

  @OneToMany(() => ProductEntity, (product) => product.category)
  products: Relation<ProductEntity[]>;
}
