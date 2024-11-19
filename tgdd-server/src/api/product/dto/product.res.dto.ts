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
