import {
  ClassField,
  StringField,
  StringFieldOptional,
} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ProductResDto {
  @StringField()
  @Expose()
  id: string;
}

export const PRODUCT_RES_FIELDS = [
  'id',
  'name',
  'image',
  'createdAt',
  'updatedAt',
]