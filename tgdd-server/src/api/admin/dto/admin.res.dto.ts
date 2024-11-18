import {
  BooleanField,
  ClassField,
  DateField,
  StringField,
  URLFieldOptional,
} from '@/decorators/field.decorators';
import { roleTransformer } from '@/utils/transformers/lower-case.transformer';
import { Exclude, Expose, Transform } from 'class-transformer';
import { IsOptional, IsPhoneNumber } from 'class-validator';

@Exclude()
export class AdminResDto {
  @StringField()
  @Expose()
  id: string;

  @StringField()
  @Expose()
  username: string;

  @StringField()
  @Expose()
  email: string;

  @StringField()
  @Expose()
  firstName: string;

  @StringField()
  @Expose()
  lastName: string;

  @DateField()
  @Expose()
  dob: Date;

  @IsOptional()
  @IsPhoneNumber('VN', { message: 'Số điện thoại không hợp lệ' })
  @Expose()
  phoneNumber: string;

  @StringField()
  @URLFieldOptional()
  @Expose()
  image: string;

  @BooleanField()
  @Expose()
  isActive: boolean;

  @Transform(roleTransformer, { toClassOnly: true })
  @Expose()
  roles?: string[];

  @ClassField(() => Date)
  @Expose()
  createdAt: Date;

  @ClassField(() => Date)
  @Expose()
  updatedAt: Date;
}

export const ADMIN_RES_FIELDS = [
  'id',
  'username',
  'email',
  'firstName',
  'lastName',
  'dob',
  'phoneNumber',
  'isActive',
  'roles',
  'image',
  'createdAt',
  'updatedAt',
];
