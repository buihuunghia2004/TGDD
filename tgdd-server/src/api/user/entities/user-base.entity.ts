import { AbstractEntity } from '@/database/entities/abstract.entity';
import { hashPassword as hashPass } from '@/utils/password.util';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { SessionEntity } from './session.entity';
import { RoleEntity } from './role.entity';

//entity user base
export abstract class UserBaseEntity extends AbstractEntity {
  constructor(data?: Partial<UserBaseEntity>) {
    super();
    Object.assign(this, data);
  }

  @Column({
    length: 50,
    nullable: true,
  })
  username: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ default: '' })
  bio?: string;

  @Column({ default: '' })
  image?: string;

  @Column({ name: 'is_verified', default: false})
  isVerified: boolean;

  @Column({ name: 'is_active', default: false})
  isActive: boolean;

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles: RoleEntity[];

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    default: null,
  })
  deletedAt: Date;

  @OneToMany(() => SessionEntity, (session) => session.user)
  sessions?: SessionEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await hashPass(this.password);
    }
  }
}
