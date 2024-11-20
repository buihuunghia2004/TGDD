import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation, TableInheritance } from 'typeorm';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { ProductEntity } from './product.entity';
import { VariantTypeEntity } from './variant-type.entity';
import { ImageVariantEntity } from './image-variant.entity';
import { Uuid } from '@/common/types/common.type';

@Entity('base_variant')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class BaseVariantEntity extends AbstractEntity {
  constructor(data?: Partial<BaseVariantEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id!: Uuid;

  @Column({name:'variant_name'})
  variantName!: string

  @ManyToOne(() => ProductEntity )
  product: Relation<ProductEntity>

  @OneToOne(() => VariantTypeEntity, (variantType) => variantType.variant )
  variantType?: Relation<VariantTypeEntity>

  @OneToMany(() => ImageVariantEntity, (image) => image.id)
  images?: Relation<ImageVariantEntity[]>

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;

}
