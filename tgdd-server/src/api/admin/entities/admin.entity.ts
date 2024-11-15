import { UserBaseEntity } from '@/api/user/entities/user-base.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Uuid } from '@/common/types/common.type';
import { SessionEntity } from '@/api/user/entities/session.entity';

@Entity('admin')
export class AdminEntity extends UserBaseEntity {
  constructor(data?: Partial<AdminEntity>) {
    super();
    Object.assign(this, data);
  }
  
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_admin_id' })
  id!: Uuid;

  @OneToMany(() => SessionEntity, (session) => session.admin)
  adminSessions?: SessionEntity[];
}
