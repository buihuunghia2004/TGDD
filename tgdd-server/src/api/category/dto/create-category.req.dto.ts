import {
  StringField,
} from '@/decorators/field.decorators';

export class CreateCategoryReqDto {
  @StringField()
  name: string;
}
