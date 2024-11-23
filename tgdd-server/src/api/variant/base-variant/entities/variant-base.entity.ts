import { Column, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Relation, TableInheritance } from 'typeorm';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { ProductEntity } from '../../../product/entities/product.entity';
import { Uuid } from '@/common/types/common.type';
import { ColorOptionEntity } from './color-option.entity';

@Entity('variant')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class BaseVariantEntity extends AbstractEntity {
  constructor(data?: Partial<BaseVariantEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_variant_id' })
  id!: Uuid

  @Column({name:'option_value'}) //ex: ramm:8gb
  optionValue!: string

  @Column({name:'name'})
  name!: string

  @Column()
  price!: number

  @Column({default:0})
  quantity?: number

  @Column({name:'product_id'})
  productId!: Uuid

  @Column({name:'color_id'})
  colorId?: Uuid

  @ManyToOne(() => ProductEntity, (product) => product.variants)
  product: Relation<ProductEntity>

  @ManyToOne(() => ColorOptionEntity, (color) => color.variants)
  color?: Relation<ColorOptionEntity>

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;
}