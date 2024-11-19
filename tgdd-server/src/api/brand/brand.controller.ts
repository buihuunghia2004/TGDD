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
import { BrandService } from './brand.service';
import { BrandResDto } from './dto/brand.res.dto';
import { CreateBrandReqDto } from './dto/create-brand.req.dto';
import { ListBrandReqDto } from './dto/list-brand.req.dto';
import { UpdateBrandReqDto } from './dto/update-brand.req.dto';

@ApiTags('brands')
@UseGuards(AuthGuard)
@Controller({
  path: 'brands',
  version: '1',
})
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @ApiAuth({
    type: BrandResDto,
    summary: 'Create brand',
    statusCode: HttpStatus.CREATED,
  })
  async createbrand(
    @Body() createbrandDto: CreateBrandReqDto,
  ): Promise<BrandResDto> {
    return await this.brandService.create(createbrandDto);
  }

  @Get()
  @ApiAuth({
    type: BrandResDto,
    summary: 'List brands',
    isPaginated: true,
  })
  async findAllBrands(
    @Query() reqDto: ListBrandReqDto,
  ): Promise<OffsetPaginatedDto<BrandResDto>> {
    return await this.brandService.findAll(reqDto);
  }

  @Get(':id')
  @ApiAuth({ type: BrandResDto, summary: 'Find brand by id' })
  @ApiParam({ name: 'id', type: 'String' })
  async findbrand(@Param('id', ParseUUIDPipe) id: Uuid): Promise<BrandResDto> {
    return await this.brandService.findOne(id);
  }

  @Patch(':id')
  @ApiAuth({ type: BrandResDto, summary: 'Update brand' })
  @ApiParam({ name: 'id', type: 'String' })
  updatebrand(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @Body() reqDto: UpdateBrandReqDto,
  ) {
    return this.brandService.update(id, reqDto);
  }

  @Delete(':id')
  @ApiAuth({
    summary: 'Delete brand',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: 'id', type: 'String' })
  removebrand(@Param('id', ParseUUIDPipe) id: Uuid) {
    return this.brandService.remove(id);
  }
}
