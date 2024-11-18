import { AdminEntity } from '@/api/admin/entities/admin.entity';
import { RoleEntity } from '@/api/user/entities/role.entity';
import { ROLE, SYSTEM_USER_ID } from '@/constants/app.constant';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class AdminSeeder1722335726360 implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(AdminEntity);
    const roleRepository = dataSource.getRepository(RoleEntity);

    const roles = await roleRepository.find();

    if (roles.length === 0) {
      throw new Error('Roles not found');
    }
    const superAdminRole = roles.find(role => role.roleName === ROLE.SUPER_ADMIN);
    const adminRole = roles.find(role => role.roleName === ROLE.ADMIN);
    const userRole = roles.find(role => role.roleName === ROLE.USER);    

    const admins = [
      new AdminEntity({
        username: 'superAdmin',
        email: 'superAdmin@example.com',
        password: '12345678',
        firstName: 'Super',
        lastName: 'Admin',
        image: 'https://example.com/avatar.png',
        isActive: true,
        createdBy: SYSTEM_USER_ID,
        updatedBy: SYSTEM_USER_ID,
        roles: [superAdminRole],
      }),
      new AdminEntity({
        username: 'admin',
        email: 'admin@example.com',
        password: '12345678',
        firstName: 'Admin',
        lastName: 'User',
        image: 'https://example.com/avatar.png',
        isActive: true,
        createdBy: SYSTEM_USER_ID,
        updatedBy: SYSTEM_USER_ID,
        roles: [adminRole],
      })
    ]
    
    const adminFactory = factoryManager.get(AdminEntity);
    await repository.save(admins);
    await adminFactory.saveMany(50,{roles: [userRole]});
  }
}
