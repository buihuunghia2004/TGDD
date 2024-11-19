import { AdminEntity } from '@/api/admin/entities/admin.entity';
import { RoleEntity } from '@/api/user/entities/role.entity';
import { ROLE, SYSTEM_USER_ID } from '@/constants/app.constant';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitRoles1611572045872 implements MigrationInterface {
  name = 'InitRoles1611572045872';

  props = {
    createdBy: SYSTEM_USER_ID,
    updatedBy: SYSTEM_USER_ID,
    updatedAt: new Date(),
    createdAt: new Date(),
  }

  userRole = new RoleEntity({
    roleName: ROLE.USER,
    ...this.props
  })
  adminRole = new RoleEntity({
    roleName: ROLE.ADMIN,
    ...this.props
  })
  supperAdminRole = new RoleEntity({
    roleName: ROLE.SUPER_ADMIN,
    ...this.props
  })
  roles = [
    this.userRole,
    this.adminRole,
    this.supperAdminRole
  ]

  user = new AdminEntity({
    username: 'user',
    email: 'user@example.com',
    password: '12345678',
    firstName: 'User',
    lastName: 'User',
    image: 'https://example.com/avatar.png',
    isActive: true,
    createdBy: SYSTEM_USER_ID,
    updatedBy: SYSTEM_USER_ID,
    roles: [this.userRole],
  })
  admin = new AdminEntity({
    username: 'admin',
    email: 'admin@example.com',
    password: '12345678',
    firstName: 'Admin',
    lastName: 'Admin',
    image: 'https://example.com/avatar.png',
    isActive: true,
    createdBy: SYSTEM_USER_ID,
    updatedBy: SYSTEM_USER_ID,
    roles: [this.adminRole],
  })
  supperAdmin = new AdminEntity({
    username: 'superAdmin',
    email: 'superAdmin@example.com',
    password: '12345678',
    firstName: 'Super',
    lastName: 'Admin',
    image: 'https://example.com/avatar.png',
    isActive: true,
    createdBy: SYSTEM_USER_ID,
    updatedBy: SYSTEM_USER_ID,
    roles: [this.supperAdminRole],
  })
  admins = [
    this.user,
    this.admin,
    this.supperAdmin
  ]


  public async up(queryRunner: QueryRunner): Promise<any> {
    // if (process.env.BACKEND_ENV === 'prod' || process.env.BACKEND_ENV === 'dev') {
      if (queryRunner.isTransactionActive) {
        await queryRunner.commitTransaction();
      }
      const roleRepository = queryRunner.manager.getRepository(RoleEntity);
      const adminRepository = queryRunner.manager.getRepository(AdminEntity);
      await adminRepository.save(this.admins);
      await roleRepository.save(this.roles);
    // }
  }

  // eslint-disable-next-line
  public async down(queryRunner: QueryRunner): Promise<any> {
    // if (process.env.BACKEND_ENV === 'prod' || process.env.BACKEND_ENV === 'dev') {
      await queryRunner.rollbackTransaction();
    // }
  }
}
