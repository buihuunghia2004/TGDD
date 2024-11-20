import { QueueName, QueuePrefix } from '@/constants/job.constant';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AdminModule } from '../admin/admin.module';
import { AdminEntity } from '../admin/entities/admin.entity';
import { CategoryModule } from '../category/category.module';
import { CategoryEntity } from '../category/entites/category.entity';

@Module({
  imports: [
    UserModule,
    AdminModule,
    CategoryModule,
    TypeOrmModule.forFeature([UserEntity, AdminEntity, CategoryEntity]),
    JwtModule.register({}),
    BullModule.registerQueue({
      name: QueueName.EMAIL,
      prefix: QueuePrefix.AUTH,
      streams: {
        events: {
          maxLen: 1000,
        },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
