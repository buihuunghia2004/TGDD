import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Uuid } from '@/common/types/common.type';
import { ColorOptionEntity } from './color-option.entity';

@Entity('image_color')
export class ColorImageEntity extends AbstractEntity {
  constructor(data?: Partial<ColorImageEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_image_color_id' })
  id!: Uuid;

  @Column({name:'url'})
  url!: string

  @Column({name:'public_id'})
  publicId?: string

  @ManyToOne(() => ColorOptionEntity, (color) => color.images)
  option?: Relation<ColorOptionEntity>
}
