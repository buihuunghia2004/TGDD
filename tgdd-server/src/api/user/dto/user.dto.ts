import {
  ClassField,
  StringField,
  StringFieldOptional,
} from '@/decorators/field.decorators';
import { Exclude, Expose, Transform } from 'class-transformer';
import { roleTransformer } from '@/utils/transformers/lower-case.transformer';
import { UserEntity } from '../entities/user.entity';
import { RoleEntity } from '../entities/role.entity';

@Exclude()
export class UserDto {
  @StringField()
  @Expose()
  id: string;

  @StringField()
  @Expose()
  username: string;

  @StringField()
  @Expose()
  email: string;

  @StringFieldOptional()
  @Expose()
  bio?: string;

  @StringField()
  @Expose()
  image: string;

  @Expose({})
  @Transform(roleTransformer)
  roles: string[];

  @ClassField(() => Date)
  @Expose()
  createdAt: Date;

  @ClassField(() => Date)
  @Expose()
  updatedAt: Date;

  toEntity(): UserEntity {
    const entity = new UserEntity();
    entity.roles = this.roles.map(role => {
      const roleEntity = new RoleEntity();
      roleEntity.roleName = role;
      return roleEntity;
    });
    return entity;
  }
}
