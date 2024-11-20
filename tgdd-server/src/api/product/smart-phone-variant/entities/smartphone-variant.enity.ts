import { ChildEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Uuid } from '@/common/types/common.type';
import { BaseVariantEntity } from '../../entities/variant-base.entity';

@ChildEntity('smartphone_variant')
export class SmartPhoneVariantEntity extends BaseVariantEntity{
  constructor(data?: Partial<SmartPhoneVariantEntity>) {
    super();
    Object.assign(this, data);
  }

  @Column({ name: 'os', nullable: true })
  os?: string
  @Column({ name: 'cpu', nullable: true })
  cpu?: string
  @Column({ name: 'ram', nullable: true })
  ram?: string
  @Column({ name: 'rom', nullable: true })
  rom?: string
  @Column({ name: 'screen_size', nullable: true })
  screenSize?: string
  @Column({ name: 'screen_tech', nullable: true })
  screenTech?: string
  @Column({ name: 'screen_resolution', nullable: true })
  screenResolution?: string
  @Column({ name: 'font_cam', nullable: true })
  fontCam?: string
  @Column({ name: 'back_cam', nullable: true })
  backCam?: string
  @Column({ name: 'pin', nullable: true })
  pin?: string
  @Column({ name: 'charge', nullable: true })
  charge?: string
  @Column({ name: 'sim', nullable: true })
  sim?: string
  @Column({ name: 'wifi', nullable: true })
  wifi?: string
  @Column({ name: 'design', nullable: true })
  design?: string
  @Column({ name: 'material', nullable: true })
  material?: string

}
