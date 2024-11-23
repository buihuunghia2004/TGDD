import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Uuid } from '@/common/types/common.type';
import { ColorImageEntity } from './color-image.entity';
import { BaseVariantEntity } from './variant-base.entity';

@Entity('color_option')
export class ColorOptionEntity extends AbstractEntity {
  constructor(data?: Partial<ColorOptionEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_color_id' })
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
