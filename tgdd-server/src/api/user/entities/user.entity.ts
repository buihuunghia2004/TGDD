import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserBaseEntity } from '@/api/user/entities/user-base.entity';
import { Uuid } from '@/common/types/common.type';
import { SessionEntity } from './session.entity';

@Entity('user')
export class UserEntity extends UserBaseEntity {
  constructor(data?: Partial<UserEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_user_id' })
  id!: Uuid;

  @OneToMany(() => SessionEntity, (session) => session.user)
  userSessions?: SessionEntity[];
}
