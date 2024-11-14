import { AdminEntity } from '@/api/admin/entities/admin.entity';
import { RoleEntity } from '@/api/user/entities/role.entity';
import { ROLE, SYSTEM_USER_ID } from '@/constants/app.constant';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class AdminSeeder1722335726360 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
  ): Promise<any> {
    const repository = dataSource.getRepository(AdminEntity);
    const roleRepository = dataSource.getRepository(RoleEntity);

    const superAdminRole = await roleRepository.findOneBy({ roleName: ROLE.SUPER_ADMIN });
    const adminRole = await roleRepository.findOneBy({ roleName: ROLE.ADMIN });
    const admins = [
        new AdminEntity({
          username: 'superAdmin',
          email: 'superAdmin@example.com',
          password: '12345678',
          bio: "hello, i'm a backend developer",
          image: 'https://example.com/avatar.png',
          isActive: true,
          isVerified: true,
          createdBy: SYSTEM_USER_ID,
          updatedBy: SYSTEM_USER_ID,
          roles: [superAdminRole],
        }),
        new AdminEntity({
          username: 'admin',
          email: 'admin@example.com',
          password: '12345678',
          bio: "hello, i'm a backend developer",
          image: 'https://example.com/avatar.png',
          isActive: true,
          isVerified: true,
          createdBy: SYSTEM_USER_ID,
          updatedBy: SYSTEM_USER_ID,
          roles: [adminRole],
        })
    ]

    await repository.save(admins);
  }
}
