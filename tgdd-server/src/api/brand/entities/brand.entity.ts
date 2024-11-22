import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Uuid } from '@/common/types/common.type';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { CategoryEntity } from '@/api/category/entites/category.entity';
import { ProductEntity } from '@/api/product/entities/product.entity';

@Entity('brand')
export class BrandEntity extends AbstractEntity {
  constructor(data?: Partial<BrandEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_brand_id' })
  id!: Uuid;

  @Column({ nullable: false })
  name!: string;

  @Column({ nullable: true })
  image?: string;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;

  @OneToMany(() => ProductEntity, (product) => product.brand)
  products: Relation<ProductEntity[]>

  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_brand_category_id',
  })
  @ManyToOne(() => CategoryEntity, (category) => category.brands)  
  category?: Relation<CategoryEntity>;
}
