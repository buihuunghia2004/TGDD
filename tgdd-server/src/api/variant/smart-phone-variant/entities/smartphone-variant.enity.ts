import { ChildEntity, Column } from 'typeorm';
import { BaseVariantEntity } from '@/api/variant/base-variant/entities/variant-base.entity';

export enum SmartphoneType {
  ADROID = 'adroid',
  IOS = 'ios',
  FEATURE = 'feature'
}

@ChildEntity('smartphone_variant')
export class SmartPhoneVariantEntity extends BaseVariantEntity{
  constructor(data?: Partial<SmartPhoneVariantEntity>) {
    super();
    Object.assign(this, data);
  }

  @Column({name:'phone_os',type:'enum', enum: SmartphoneType})
  phone_os?: string

  @Column({name:'phone_ram'})
  phone_ram?: string

  @Column({name:'phone_screen_solution'})
  phone_screenSolution?: string

  @Column({name:'phone_screen_hz'})
  phone_screenHz?: string

  @Column({name:'phone_charge_future'})
  phone_chargeFuture?: string

  @Column({name:'phone_storage'})
  phone_storage?: string

  @Column({name:'phone_special_future'})
  phone_specialFuture?: string

}

