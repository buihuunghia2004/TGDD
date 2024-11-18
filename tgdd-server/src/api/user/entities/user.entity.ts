import { Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserBaseEntity } from '@/api/user/entities/user-base.entity';
import { Uuid } from '@/common/types/common.type';
import { SessionEntity } from './session.entity';
import { RoleEntity } from './role.entity';

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

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];
}
