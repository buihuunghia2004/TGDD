import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { BaseVariantEntity } from '../../variant/base-variant/entities/variant-base.entity';
import { Uuid } from '@/common/types/common.type';
import { BrandEntity } from '@/api/brand/entities/brand.entity';

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

  @Column()
  thumbnail!: string

  @Column({name:'option_title'})
  optionTitle?: string

  @OneToMany(() => BaseVariantEntity, (variant) => variant.product)
  variants?: Relation<BaseVariantEntity[]>

  @Column({name:'brand_id'})
  brandId!: Uuid

  @ManyToOne(() => BrandEntity, (brand) => brand.products)
  brand?: Relation<BrandEntity>

  @Column({type: 'json'})
  attributes?: Record<string, any>;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;
}