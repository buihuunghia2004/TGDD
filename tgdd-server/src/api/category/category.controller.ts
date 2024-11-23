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
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryResDto } from './dto/category.res.dto';
import { CreateCategoryReqDto } from './dto/create-category.req.dto';
import { ListCategoryReqDto } from './dto/list-category.req.dto';
import { UpdateCategoryReqDto } from './dto/update-category.req.dto';

@ApiTags('categories')
@Controller({
  path: 'categories',
  version: '1',
})
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiAuth({
    type: CategoryResDto,
    summary: 'Create category',
    statusCode: HttpStatus.CREATED,
  })
  async createCategory(
    @Body() createCategoryDto: CreateCategoryReqDto,
  ): Promise<CategoryResDto> {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiAuth({
    type: CategoryResDto,
    summary: 'List categories',
    isPaginated: true,
  })
  async findAllCategories(
    @Query() reqDto: ListCategoryReqDto,
  ): Promise<OffsetPaginatedDto<CategoryResDto>> {
    return await this.categoryService.findAll(reqDto);
  }

  @Get(':id')
  @ApiAuth({ type: CategoryResDto, summary: 'Find category by id' })
  @ApiParam({ name: 'id', type: 'String' })
  async findCategory(@Param('id', ParseUUIDPipe) id: Uuid): Promise<CategoryResDto> {
    return await this.categoryService.findOne(id);
  }

  @Patch(':id')
  @ApiAuth({ type: CategoryResDto, summary: 'Update category' })
  @ApiParam({ name: 'id', type: 'String' })
  updateCategory(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @Body() reqDto: UpdateCategoryReqDto,
  ) {
    return this.categoryService.update(id, reqDto);
  }

  @Delete(':id')
  @ApiAuth({
    summary: 'Delete category',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: 'id', type: 'String' })
  removeCategory(@Param('id', ParseUUIDPipe) id: Uuid) {
    return this.categoryService.remove(id);
  }
}
