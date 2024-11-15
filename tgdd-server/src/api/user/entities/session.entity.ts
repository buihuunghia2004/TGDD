import { Uuid } from '@/common/types/common.type';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AdminEntity } from '@/api/admin/entities/admin.entity';

@Entity('session')
export class SessionEntity extends AbstractEntity {
  constructor(data?: Partial<SessionEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_session_id',
  })
  id!: Uuid;

  @Column({
    name: 'hash',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  hash!: string;

  @Column({
    name: 'user_id',
    type: 'uuid',
    nullable: true,
  })
  userId?: Uuid;

  @Column({
    name: 'admin_id',
    type: 'uuid',
    nullable: true,
  })
  adminId?: Uuid;

  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_session_user',
  })
  @ManyToOne(() => UserEntity, (user) => user.userSessions)
  user?: UserEntity;

  @JoinColumn({
    name: 'admin_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'FK_session_admin',
  })
  @ManyToOne(() => AdminEntity, (admin) => admin.adminSessions)
  admin?: AdminEntity;
}
