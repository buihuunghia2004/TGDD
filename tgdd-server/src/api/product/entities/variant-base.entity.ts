import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation, TableInheritance } from 'typeorm';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { ProductEntity } from './product.entity';
import { Uuid } from '@/common/types/common.type';
import { ColorOptionEntity } from '../color-option/entities/color-option.entity';

@Entity('base_variant')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class BaseVariantEntity extends AbstractEntity {
  constructor(data?: Partial<BaseVariantEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id!: Uuid;

  @Column({name:'option_name'})
  optionName!: string

  @Column({name:'variant_name'})
  variantName!: string

  @Column()
  price!: number

  @Column()
  quantity?: number

  @ManyToOne(() => ProductEntity )
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
