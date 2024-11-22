import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    UserModule, 
    AdminModule, 
    HealthModule, 
    AuthModule, 
    HomeModule,
    CategoryModule,
    ProductModule
  ],
})
export class ApiModule {}
