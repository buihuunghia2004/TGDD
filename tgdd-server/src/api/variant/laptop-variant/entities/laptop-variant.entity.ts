import { ChildEntity, Column } from 'typeorm';
import { BaseVariantEntity } from '@/api/variant/base-variant/entities/variant-base.entity';

@ChildEntity('laptop_variant')
export class LaptopVariantEntity extends BaseVariantEntity{
  constructor(data?: Partial<LaptopVariantEntity>) {
    super();
    Object.assign(this, data);
  }

  @Column({ name: 'lap_os', nullable: true })
  lap_os?: string
  @Column({ name: 'lap_cpu', nullable: true })
  lap_cpu?: string
  @Column({ name: 'lap_card', nullable: true })
  lap_card?: string
  @Column({ name: 'lap_cpu_speed', nullable: true })
  lap_cpuSpeed?: string
  @Column({ name: 'lap_ram_type', nullable: true })
  lap_ramType?: string
  @Column({ name: 'lap_ram', nullable: true })
  lap_ram?: string
  @Column({ name: 'lap_storage', nullable: true })
  lap_storage?: string
  @Column({ name: 'lap_screen_size', nullable: true })
  lap_screenSize?: string
  @Column({ name: 'lap_screen_resolution', nullable: true })
  lap_screenResolution?: string
  @Column({ name: 'lap_battery', nullable: true })
  lap_battery?: string
  @Column({ name: 'lap_charge', nullable: true })
  lap_charge?: string
  @Column({ name: 'lap_design', nullable: true })
  lap_design?: string
  @Column({ name: 'lap_material', nullable: true })
  lap_material?: string

}
