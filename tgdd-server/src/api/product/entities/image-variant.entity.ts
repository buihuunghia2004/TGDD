import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import { Uuid } from '@/common/types/common.type';

@Entity('image_variant')
export class ImageVariantEntity extends AbstractEntity {
  constructor(data?: Partial<ImageVariantEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_image_variant_id' })
  id!: Uuid;

  @Column({name:'url'})
  url!: string

  @Column({name:'public_id'})
  publicId?: string
}
