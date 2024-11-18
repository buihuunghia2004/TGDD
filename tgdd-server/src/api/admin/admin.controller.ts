import { CursorPaginatedDto } from '@/common/dto/cursor-pagination/paginated.dto';
import { OffsetPaginatedDto } from '@/common/dto/offset-pagination/paginated.dto';
import { Uuid } from '@/common/types/common.type';
import { CurrentUser } from '@/decorators/current-user.decorator';
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
  Request,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { UserResDto } from '../user/dto/user.res.dto';
import { CreateUserReqDto } from '../user/dto/create-user.req.dto';
import { CreateAdminReqDto } from './dto/create-admin.req.dto';
import { ListAdminReqDto } from './dto/list-admin.req.dto';

@ApiTags('admins')
@Controller({
  path: 'admins',
  version: '1',
})
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @ApiAuth({
  //   type: UserResDto,
  //   summary: 'Get current user',
  // })
  // @Get('me')
  // async getCurrentUser(@CurrentUser('id') userId: Uuid): Promise<UserResDto> {
  //   return await this.userService.findOne(userId);
  // }

  @Post()
  @ApiAuth({
    type: UserResDto,
    summary: 'Create admin',
    statusCode: HttpStatus.CREATED,
  })
  async createUser(
    @Body() createUserDto: CreateAdminReqDto,
    @Request() req
  ): Promise<UserResDto> {
    return await this.adminService.create(createUserDto,req.user.username);
  }

  @Get()
  // @ApiAuth({
  //   type: UserResDto,
  //   summary: 'List users',
  //   isPaginated: true,
  // })
  async findAllAdmins(
    @Query() reqDto: ListAdminReqDto,
  ): Promise<OffsetPaginatedDto<UserResDto>> {
    const a = await this.adminService.findAll(reqDto);


    console.log('aaaafddd',a.data[0]);
    return a
  }

  // @Get('/load-more')
  // @ApiAuth({
  //   type: UserResDto,
  //   summary: 'Load more users',
  //   isPaginated: true,
  //   paginationType: 'cursor',
  // })
  // async loadMoreUsers(
  //   @Query() reqDto: LoadMoreUsersReqDto,
  // ): Promise<CursorPaginatedDto<UserResDto>> {
  //   return await this.userService.loadMoreUsers(reqDto);
  // }

  // @Get(':id')
  // @ApiAuth({ type: UserResDto, summary: 'Find user by id' })
  // @ApiParam({ name: 'id', type: 'String' })
  // async findUser(@Param('id', ParseUUIDPipe) id: Uuid): Promise<UserResDto> {
  //   return await this.userService.findOne(id);
  // }

  // @Patch(':id')
  // @ApiAuth({ type: UserResDto, summary: 'Update user' })
  // @ApiParam({ name: 'id', type: 'String' })
  // updateUser(
  //   @Param('id', ParseUUIDPipe) id: Uuid,
  //   @Body() reqDto: UpdateUserReqDto,
  // ) {
  //   return this.userService.update(id, reqDto);
  // }

  // @Delete(':id')
  // @ApiAuth({
  //   summary: 'Delete user',
  //   errorResponses: [400, 401, 403, 404, 500],
  // })
  // @ApiParam({ name: 'id', type: 'String' })
  // removeUser(@Param('id', ParseUUIDPipe) id: Uuid) {
  //   return this.userService.remove(id);
  // }

  // @ApiAuth()
  // @Post('me/change-password')
  // async changePassword() {
  //   return 'change-password';
  // }
}
