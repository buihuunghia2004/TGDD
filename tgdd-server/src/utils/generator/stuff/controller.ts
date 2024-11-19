`import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
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
import { xxxService } from './xxx.service';
import { xxxResDto } from './dto/xxx.res.dto';
import { CreatexxxReqDto } from './dto/create-xxx.req.dto';
import { ListxxxReqDto } from './dto/list-xxx.req.dto';
import { UpdatexxxReqDto } from './dto/update-xxx.req.dto';

@ApiTags('xxxs')
@UseGuards(AuthGuard)
@Controller({
  path: 'xxxs',
  version: '1',
})
export class xxxController {
  constructor(private readonly xxxService: xxxService) {}

  @Post()
  @ApiAuth({
    type: xxxResDto,
    summary: 'Create xxx',
    statusCode: HttpStatus.CREATED,
  })
  async createxxx(
    @Body() createxxxDto: CreatexxxReqDto,
  ): Promise<xxxResDto> {
    return await this.xxxService.create(createxxxDto);
  }

  @Get()
  @ApiAuth({
    type: xxxResDto,
    summary: 'List categories',
    isPaginated: true,
  })
  async findAllCategories(
    @Query() reqDto: ListxxxReqDto,
  ): Promise<OffsetPaginatedDto<xxxResDto>> {
    return await this.xxxService.findAll(reqDto);
  }

  @Get(':id')
  @ApiAuth({ type: xxxResDto, summary: 'Find xxx by id' })
  @ApiParam({ name: 'id', type: 'String' })
  async findxxx(@Param('id', ParseUUIDPipe) id: Uuid): Promise<xxxResDto> {
    return await this.xxxService.findOne(id);
  }

  @Patch(':id')
  @ApiAuth({ type: xxxResDto, summary: 'Update xxx' })
  @ApiParam({ name: 'id', type: 'String' })
  updatexxx(
    @Param('id', ParseUUIDPipe) id: Uuid,
    @Body() reqDto: UpdatexxxReqDto,
  ) {
    return this.xxxService.update(id, reqDto);
  }

  @Delete(':id')
  @ApiAuth({
    summary: 'Delete xxx',
    errorResponses: [400, 401, 403, 404, 500],
  })
  @ApiParam({ name: 'id', type: 'String' })
  removexxx(@Param('id', ParseUUIDPipe) id: Uuid) {
    return this.xxxService.remove(id);
  }
}
`