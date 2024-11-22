import { ChildEntity, Column } from 'typeorm';
import { BaseVariantEntity } from '../../entities/variant-base.entity';

@ChildEntity('laptop_variant')
export class LaptopVariantEntity extends BaseVariantEntity{
  constructor(data?: Partial<LaptopVariantEntity>) {
    super();
    Object.assign(this, data);
  }

  @Column({ name: 'os', nullable: true })
  os?: string
  @Column({ name: 'cpu', nullable: true })
  cpu?: string
  @Column({ name: 'card', nullable: true })
  card?: string
  @Column({ name: 'cpu_speed', nullable: true })
  cpuSpeed?: string
  @Column({ name: 'ram_type', nullable: true })
  ramType?: string
  @Column({ name: 'ram', nullable: true })
  ram?: string
  @Column({ name: 'storage', nullable: true })
  storage?: string
  @Column({ name: 'screen_size', nullable: true })
  screenSize?: string
  @Column({ name: 'screen_resolution', nullable: true })
  screenResolution?: string
  @Column({ name: 'battery', nullable: true })
  battery?: string
  @Column({ name: 'charge', nullable: true })
  charge?: string
  @Column({ name: 'design', nullable: true })
  design?: string
  @Column({ name: 'material', nullable: true })
  material?: string

}
