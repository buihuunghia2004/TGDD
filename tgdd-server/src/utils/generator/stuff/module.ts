`import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { yxxEntity } from './entites/entity';
import { yxxController } from './controller';
import { yxxService } from './service';

@Module({
  imports: [TypeOrmModule.forFeature([yxxEntity])],
  controllers: [yxxController],
  providers: [yxxService],
  exports: [yxxService],
})
export class yxxModule {}
`