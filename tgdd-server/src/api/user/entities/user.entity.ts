import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserBaseEntity } from '@/api/user/entities/user-base.entity';
import { Uuid } from '@/common/types/common.type';

@Entity('user')
export class UserEntity extends UserBaseEntity {
  constructor(data?: Partial<UserEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_user_id' })
  id!: Uuid;
}
