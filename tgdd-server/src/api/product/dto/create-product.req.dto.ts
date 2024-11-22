import { Uuid } from '@/common/types/common.type';
import { ProductType } from '@/constants/product.constant';
import {
  StringField,
} from '@/decorators/field.decorators';
import { IsArray, IsEnum, ValidateNested } from 'class-validator';
import { CreateSmartPhoneVariantReqDto } from '../smart-phone-variant/dto/create-smartphone.variant.req.dto';
import { CreateLaptopVariantReqDto } from '../laptop-variant/dto/create-smartphone.variant.req.dto';
import { Type } from 'class-transformer';

export class CreateProductReqDto {

  @StringField()
  @IsEnum(ProductType)
  type: ProductType

  @StringField()
  brandId: Uuid

  @StringField()
  productName: string

  @StringField()
  image: string

  @StringField()
  optionTitle: string
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type((options) => {
    const obj = options?.object as CreateProductReqDto;
    return obj?.type === ProductType.SMART_PHONE
      ? CreateSmartPhoneVariantReqDto
      : CreateLaptopVariantReqDto;
  })
  variants: CreateSmartPhoneVariantReqDto[] | CreateLaptopVariantReqDto[];
}
