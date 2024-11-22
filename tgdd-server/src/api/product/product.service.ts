import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { SYSTEM_USER_ID } from '@/constants/app.constant';
import { ErrorCode } from '@/constants/error-code.constant';
import { ValidationException } from '@/exceptions/validation.exception';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import assert from 'assert';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateProductReqDto } from './dto/create-product.req.dto';
import { ProductResDto } from './dto/product.res.dto';
import { ListProductReqDto } from './dto/list-product.req.dto';
import { OffsetPaginationDto } from '@/common/dto/offset-pagination/offset-pagination.dto';
import { UpdateProductReqDto } from './dto/update-product.req.dto';
import { ProductEntity } from './entities/product.entity';
import { BrandEntity } from '../brand/entities/brand.entity';
import { SmartPhoneVariantEntity } from './smart-phone-variant/entities/smartphone-variant.enity';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(SmartPhoneVariantEntity)
    private readonly smartphoneRepository: Repository<SmartPhoneVariantEntity>,
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  async create(dto: CreateProductReqDto, creator: string): Promise<ProductResDto> {
    const brand = await this.brandRepository.findOneOrFail({where: {id: dto.brandId},relations: ['category']});
    const productExists = await this.productRepository.findOne({where: {productName: dto.productName, brand: brand}});

    if (productExists) {
      throw new ValidationException(ErrorCode.E001);
    }


    const a  = new SmartPhoneVariantEntity();
    a.os = 'os';
    a.cpu = 'cpu';
    a.ram = 'ram';
    a.rom = 'rom';
    a.screenSize = 'screenSize';
    a.screenTech = 'screenTech';
    a.screenResolution = 'screenResolution';
    a.fontCam = 'fontCam';
    a.backCam = 'backCam';
    a.pin = 'pin';
    a.sim = 'sim';
    a.charge = 'charge';
    a.wifi = 'wifi';
    await this.smartphoneRepository.save(a);

    console.log('ssss');
    
    
    const smartPhoneVariants = dto.variants.map((variant) => {
      return new SmartPhoneVariantEntity({
        createdBy: creator,
        updatedBy: SYSTEM_USER_ID,
      });
    })



    // await this.smartphoneRepository.save(smartPhoneVariants);

    const newProduct = new ProductEntity({
      productName: dto.productName,
      image: dto.image,
      optionTitle: dto.optionTitle,
      variants: smartPhoneVariants,
      brand: brand,
      category: brand.category,
      createdBy: creator,
      updatedBy: SYSTEM_USER_ID,
    });

    const savedProduct = await this.productRepository.save(newProduct);
    this.logger.debug(savedProduct);

    return plainToInstance(ProductResDto, savedProduct);
  }

  async findAll(reqDto:ListProductReqDto): Promise<OffsetPaginatedDto<ProductResDto>>{
    console.log('reqDto',reqDto);
    
    const [entities,count] = await this.productRepository.findAndCount({
      ...reqDto._options
    })

    const metaDto = new OffsetPaginationDto(count, reqDto);
    return new OffsetPaginatedDto<ProductResDto>(plainToInstance(ProductResDto,entities), metaDto);
  }

  async findOne(id: Uuid): Promise<ProductResDto> {
    assert(id, 'id is required');
    const product = await this.productRepository.findOneByOrFail({ id });
    return product.toDto(ProductResDto);
  }

  async update(id: Uuid, updateProductDto: UpdateProductReqDto ) {
    const product = await this.productRepository.findOneByOrFail({ id });

    product.updatedBy = SYSTEM_USER_ID;

    await this.productRepository.save(product);
  }

  async remove(id: Uuid) {
    await this.productRepository.findOneByOrFail({ id });
    await this.productRepository.softDelete(id);
  }
}