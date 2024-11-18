import {
  ClassField,
  StringField,
} from '@/decorators/field.decorators';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CategoryResDto {
  @StringField()
  @Expose()
  name: string;

  @StringField()
  @Expose()
  slug: string;

  @ClassField(() => Date)
  @Expose()
  createdAt: Date;

  @ClassField(() => Date)
  @Expose()
  updatedAt: Date;
}

export const CATEGORY_RES_FIELDS = [
  'name',
  'slug',
  'createdAt',
  'updatedAt',
];
