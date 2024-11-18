import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AdminModule, HealthModule, AuthModule, HomeModule],
})
export class ApiModule {}
