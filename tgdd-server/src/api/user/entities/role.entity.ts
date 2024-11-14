import { Uuid } from '@/common/types/common.type';
import { ROLE } from '@/constants/app.constant';
import { AbstractEntity } from '@/database/entities/abstract.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('role')
export class RoleEntity extends AbstractEntity {
  constructor(data?: Partial<RoleEntity>) {
    super();
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_role_id',
  })
  id!: Uuid;

  @Column({
    name: 'role_name',
    type: 'varchar',
    length: 255,
    enum: [ROLE.ADMIN, ROLE.USER],
  })
  roleName!: string;
}
