import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    UserModule, 
    AdminModule, 
    HealthModule, 
    AuthModule, 
    HomeModule,
    CategoryModule
  ],
})
export class ApiModule {}
