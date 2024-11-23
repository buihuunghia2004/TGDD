import { CATEGORY } from '@/constants/product.constant';
import { LaptopVariantEntity } from './laptop-variant/entities/laptop-variant.entity';
import { SmartPhoneVariantEntity } from './smart-phone-variant/entities/smartphone-variant.enity';

export class VariantFactory{
  static variantRegistry: Record<string, any> = {}

  static registerVariantType(type: string, variantEntity: any){
    this.variantRegistry[type] = variantEntity
  }

  static createVariantEntity(type: string, payload?: any){
    const variantEntity = this.variantRegistry[type]
    if (variantEntity === undefined) {
      throw new Error(`Unknown variant type: ${type}`)
    }
    return new variantEntity(payload)
  }

  static createVariantEntities(type: string, payload?: any[]){
    const variantEntity = this.variantRegistry[type]
    if (variantEntity === undefined) {
      throw new Error(`Unknown variant type: ${type}`)
    }
    return payload.map(item => new variantEntity(item))
  }
}

VariantFactory.registerVariantType(CATEGORY.SMART_PHONE, SmartPhoneVariantEntity)
VariantFactory.registerVariantType(CATEGORY.LAPTOP, LaptopVariantEntity)
