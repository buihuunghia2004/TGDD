import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { ApiAuth } from '@/decorators/http.decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/guards/auth.guard';
import { productService } from './product.service';
import { productResDto } from './dto/product.res.dto';
import { CreateProductReqDto } from './dto/create-product.req.dto';
import { ListProductReqDto } from './dto/list-product.req.dto';
import { UpdateProductReqDto } from './dto/update-product.req.dto';

@ApiTags('products')
@UseGuards(AuthGuard)
@Controller({
  path: 'products',
  version: '1',
})
export class ProductController {
  constructor(private readonly productService: productService) {}

  @Post()
  @ApiAuth({
    type: productResDto,
    summary: 'Create product',
    statusCode: HttpStatus.CREATED,
  })
  async createProduct(
    @Body() createProductDto: CreateProductReqDto,
  ): Promise<ProductResDto> {
    return await this.productService.create(createProductDto);
  }

  @Get()
  @ApiAuth({
    type: productResDto,
    summary: 'List products',
    isPaginated: true,
  })
  async findAllProducts(
    @Query() reqDto: ListProductReqDto,
  ): Promise<OffsetPaginatedDto<ProductResDto>> {
    return await this.productService.findAll(reqDto);
  }

  @Get(':id')
  @ApiAuth({ type: productResDto, summary: 'Find product by id' })
  @ApiParam({ name: 'id', type: 'String' })
  async findProduct(@Param('id', ParseUUIDPipe) id: Uuid): Promise<ProductResDto> {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiAuth({ type: productResDto, summary: 'Update product' })
  @ApiParam({ name: 'id', type: 'String' })
  updateProduct(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @Body() reqDto: UpdateProductReqDto,
  ) {
    return this.productService.update(id, reqDto);
  }

  @Delete(':id')
  @ApiAuth({
    summary: 'Delete product',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: 'id', type: 'String' })
  removeProduct(@Param('id', ParseUUIDPipe) id: Uuid) {
    return this.productService.remove(id);
  }
}
