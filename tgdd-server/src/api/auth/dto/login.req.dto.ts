import { EmailField, PasswordField, StringField } from '@/decorators/field.decorators';

export class UserLoginReqDto {
  @EmailField()
  email!: string;

  @PasswordField()
  password!: string;
}

export class AdminLoginReqDto {
  @StringField()
  username!: string;

  @PasswordField()
  password!: string;
}
