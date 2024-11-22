import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Relation, TableInheritance } from 'typeorm';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Uuid } from '@/common/types/common.type';
import { ColorImageEntity } from './color-image.entity';
import { BaseVariantEntity } from '../../entities/variant-base.entity';

@Entity('base_variant')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class ColorOptionEntity extends AbstractEntity {
  constructor(data?: Partial<ColorOptionEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id!: Uuid;

  @Column({name:'name'})
  name?: string

  @Column({name:'code'})
  code?: string

  @OneToMany(() => BaseVariantEntity, (variant) => variant.color)
  variants?: Relation<BaseVariantEntity[]>

  @OneToMany(() => ColorImageEntity, (image) => image.option)
  @JoinColumn({ name: 'id' })
  images?: Relation<ColorImageEntity[]>
}
