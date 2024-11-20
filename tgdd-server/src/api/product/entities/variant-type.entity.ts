import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Uuid } from '@/common/types/common.type';
import { BaseVariantEntity } from './variant-base.entity';
import { ProductEntity } from './product.entity';

@Entity('variant_type')
export class VariantTypeEntity extends AbstractEntity {
  constructor(data?: Partial<VariantTypeEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_variant_type_id' })
  id!: Uuid;

  @Column({ name:'config_name'})
  configName?: string;

  @Column({ name:'config_vale'})
  configValue?: string;

  @Column({ name:'color_name'})
  colorName?: string;

  @Column({ name:'color_vale'})
  colorValue?: string;

  @ManyToOne(() => ProductEntity, (product) => product.variantTypes)
  product?: Relation<ProductEntity>

  @OneToOne(() => BaseVariantEntity, (variant) => variant.variantType)
  @JoinColumn({ name: 'variant_id' })
  variant?: Relation<BaseVariantEntity>

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;

}
