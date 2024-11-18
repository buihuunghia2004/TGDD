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

  roles = [
    new RoleEntity({
      roleName: ROLE.USER,
      ...this.props
    }),
    new RoleEntity({
      roleName: ROLE.ADMIN,
      ...this.props
    }),
    new RoleEntity({
      roleName: ROLE.SUPER_ADMIN,
      ...this.props
    }),
  ]


  public async up(queryRunner: QueryRunner): Promise<any> {
    // if (process.env.BACKEND_ENV === 'prod' || process.env.BACKEND_ENV === 'dev') {
      if (queryRunner.isTransactionActive) {
        await queryRunner.commitTransaction();
      }
      const roleRepository = queryRunner.manager.getRepository(RoleEntity);
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
