import { UserBaseEntity } from '@/api/user/entities/user-base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Uuid } from '@/common/types/common.type';
import { SessionEntity } from '@/api/user/entities/session.entity';
import { RoleEntity } from '@/api/user/entities/role.entity';

@Entity('admin')
export class AdminEntity extends UserBaseEntity {
  constructor(data?: Partial<AdminEntity>) {
    super();
    Object.assign(this, data);
  }
  
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_admin_id' })
  id!: Uuid;

  @Column({name: 'first_name', nullable: true})
  firstName?: string

  @Column({name: 'last_name', nullable: true})
  lastName?: string

  @Column({name: 'phone_number', nullable: true})
  phoneNumber?: string

  @Column({name: 'dob', nullable: true})
  dob?: Date

  @OneToMany(() => SessionEntity, (session) => session.admin)
  adminSessions?: SessionEntity[];

  @ManyToMany(() => RoleEntity)
  @JoinTable(
    {
    name: 'admin_roles',
    joinColumn: {
      name: 'admin_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  }
)
  roles: RoleEntity[];
}
