import { Uuid } from '@/common/types/common.type';
import { ProductType } from '@/constants/product.constant';
import {
  StringField,
} from '@/decorators/field.decorators';
import { IsArray, IsEnum, ValidateNested } from 'class-validator';
import { CreateSmartPhoneVariantReqDto } from '@/api/variant/smart-phone-variant/dto/create-smartphone.variant.req.dto';
import { CreateLaptopVariantReqDto } from '@/api/variant/laptop-variant/dto/create-smartphone.variant.req.dto';

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
  variants: CreateSmartPhoneVariantReqDto[] | CreateLaptopVariantReqDto[];
}
