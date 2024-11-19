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
import { brandService } from './brand.service';
import { brandResDto } from './dto/brand.res.dto';
import { CreatebrandReqDto } from './dto/create-brand.req.dto';
import { ListbrandReqDto } from './dto/list-brand.req.dto';
import { UpdatebrandReqDto } from './dto/update-brand.req.dto';

@ApiTags('brands')
@UseGuards(AuthGuard)
@Controller({
  path: 'brands',
  version: '1',
})
export class brandController {
  constructor(private readonly brandService: brandService) {}

  @Post()
  @ApiAuth({
    type: brandResDto,
    summary: 'Create brand',
    statusCode: HttpStatus.CREATED,
  })
  async createbrand(
    @Body() createbrandDto: CreatebrandReqDto,
  ): Promise<brandResDto> {
    return await this.brandService.create(createbrandDto);
  }

  @Get()
  @ApiAuth({
    type: brandResDto,
    summary: 'List categories',
    isPaginated: true,
  })
  async findAllCategories(
    @Query() reqDto: ListbrandReqDto,
  ): Promise<OffsetPaginatedDto<brandResDto>> {
    return await this.brandService.findAll(reqDto);
  }

  @Get(':id')
  @ApiAuth({ type: brandResDto, summary: 'Find brand by id' })
  @ApiParam({ name: 'id', type: 'String' })
  async findbrand(@Param('id', ParseUUIDPipe) id: Uuid): Promise<brandResDto> {
    return await this.brandService.findOne(id);
  }

  @Patch(':id')
  @ApiAuth({ type: brandResDto, summary: 'Update brand' })
  @ApiParam({ name: 'id', type: 'String' })
  updatebrand(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @Body() reqDto: UpdatebrandReqDto,
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
