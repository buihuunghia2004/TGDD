import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { BrandEntity } from '../brand/entities/brand.entity';
import { SmartPhoneVariantEntity } from './smart-phone-variant/entities/smartphone-variant.enity';
import { BaseVariantEntity } from './entities/variant-base.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity,SmartPhoneVariantEntity,BrandEntity,BaseVariantEntity])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
