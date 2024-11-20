import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { BaseVariantEntity } from './variant-base.entity';
import { Uuid } from '@/common/types/common.type';
import { CategoryEntity } from '@/api/category/entites/category.entity';
import { BrandEntity } from '@/api/brand/entities/brand.entity';
import { VariantTypeEntity } from './variant-type.entity';

@Entity('product')
export class ProductEntity extends AbstractEntity {
  constructor(data?: Partial<ProductEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_product_id' })
  id!: Uuid;

  @Column({name:'product_name'})
  productName!: string

  @Column({name:'image'})
  image?: string

  @OneToMany(() => BaseVariantEntity, (variant) => variant.product)
  variants?: Relation<BaseVariantEntity[]>

  @OneToMany(() => VariantTypeEntity, (variant) => variant.product)
  variantTypes?: Relation<VariantTypeEntity[]>

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  category?: Relation<CategoryEntity>

  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  brand?: Relation<BrandEntity>

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;

}
