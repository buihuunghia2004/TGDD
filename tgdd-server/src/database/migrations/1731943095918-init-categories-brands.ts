import { BrandEntity } from '@/api/brand/entities/brand.entity';
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
  //categories
  smartPhoneCate = new CategoryEntity({
    name: 'Điện thoại',
      slug: 'dien-thoai',
      ...this.props,
  })

  tabletCate = new CategoryEntity({
    name: 'Tablet',
    slug: 'tablet',
    ...this.props,
  })

  laptopCate = new CategoryEntity({
    name: 'Laptop',
    slug: 'laptop',
    ...this.props,
  })
  categories = [
    this.smartPhoneCate,
    this.tabletCate,
    this.laptopCate
  ];
  //brands
  smartPhonebrands=[
    new BrandEntity({
      name: 'Apple',
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
      updatedAt: new Date(),
      createdAt: new Date(),
      category: this.smartPhoneCate
    }),
    new BrandEntity({
      name: 'Samsung',
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
      updatedAt: new Date(),
      createdAt: new Date(),
      category: this.smartPhoneCate
    }),
    new BrandEntity({
      name: 'Oppo',
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
      updatedAt: new Date(),
      createdAt: new Date(),
      category: this.smartPhoneCate
    }),
    new BrandEntity({
      name: 'Xiaomi',
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
      updatedAt: new Date(),
      createdAt: new Date(),
      category: this.smartPhoneCate
    }),
  ]
  tabletBrands=[
    new BrandEntity({
      name: 'Apple',
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
      updatedAt: new Date(),
      createdAt: new Date(),
      category: this.tabletCate
    }),
    new BrandEntity({
      name: 'Samsung',
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
      updatedAt: new Date(),
      createdAt: new Date(),
      category: this.tabletCate
    }),
    new BrandEntity({
      name: 'Oppo',
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
      updatedAt: new Date(),
      createdAt: new Date(),
      category: this.tabletCate
    }),
  ]
  laptopBrands=[
    new BrandEntity({
      name: 'Apple',
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
      updatedAt: new Date(),
      createdAt: new Date(),
      category: this.laptopCate
    }),
    new BrandEntity({
      name: 'Asus',
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
      updatedAt: new Date(),
      createdAt: new Date(),
      category: this.laptopCate
    }),
    new BrandEntity({
      name: 'Lenovo',
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
      updatedAt: new Date(),
      createdAt: new Date(),
      category: this.laptopCate
    }),
    new BrandEntity({
      name: 'Dell',
      createdBy: SYSTEM_USER_ID,
      updatedBy: SYSTEM_USER_ID,
      updatedAt: new Date(),
      createdAt: new Date(),
      category: this.laptopCate
    }),
  ]
  brands=[
    ...this.smartPhonebrands,
    ...this.tabletBrands,
    ...this.laptopBrands
  ]
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (queryRunner.isTransactionActive) {
        await queryRunner.commitTransaction();
      }
      const categoryRepository = queryRunner.manager.getRepository(CategoryEntity);
      const brandRepository = queryRunner.manager.getRepository(BrandEntity);
      await categoryRepository.save(this.categories);
      await brandRepository.save(this.brands);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.rollbackTransaction();
  }
}
