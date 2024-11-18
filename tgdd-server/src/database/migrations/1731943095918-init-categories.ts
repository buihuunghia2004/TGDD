import { CategoryEntity } from '@/api/category/entites/category.entity';
import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitCategories1731943095918 implements MigrationInterface {
  name = 'InitCategories1731943095918';
  props = {
    createdBy: SYSTEM_USER_ID,
    updatedBy: SYSTEM_USER_ID,
    updatedAt: new Date(),
    createdAt: new Date(),
  };
  categories = [
    new CategoryEntity({
      name: 'Điện thoại',
      slug: 'dien-thoai',
      ...this.props,
    }),
    new CategoryEntity({
        name: 'Tablet',
        slug: 'tablet',
        ...this.props,
      }),
    new CategoryEntity({
    name: 'Laptop',
    slug: 'laptop',
    ...this.props,
    }),
  ];
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.isTransactionActive) {
        await queryRunner.commitTransaction();
      }
      const roleRepository = queryRunner.manager.getRepository(CategoryEntity);
      await roleRepository.save(this.categories);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
  }
}
