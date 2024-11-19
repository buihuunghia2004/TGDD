import {
  StringField,
  StringFieldOptional,
} from '@/decorators/field.decorators';

export class CreateBrandReqDto {
  @StringField()
  name: string

  @StringFieldOptional()
  image?: string
}
