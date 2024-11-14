import { RoleEntity } from '@/api/user/entities/role.entity';
import { ROLE } from '@/constants/app.constant';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

export class RoleSeed1731572045872 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
    ): Promise<any> {
        const roleRepository = dataSource.getRepository(RoleEntity);
        const roles = [
            { roleName: ROLE.SUPER_ADMIN },
            { roleName: ROLE.ADMIN },
            { roleName: ROLE.USER },
        ]
        roleRepository.save(roles);
    }
}
