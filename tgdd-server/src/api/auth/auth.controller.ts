import { CurrentUser } from '@/decorators/current-user.decorator';
import { ApiAuth, ApiPublic } from '@/decorators/http.decorators';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginResDto } from './dto/login.res.dto';
import { RefreshReqDto } from './dto/refresh.req.dto';
import { RefreshResDto } from './dto/refresh.res.dto';
import { RegisterReqDto } from './dto/register.req.dto';
import { RegisterResDto } from './dto/register.res.dto';
import { JwtPayloadType } from './types/jwt-payload.type';
import { AdminLoginReqDto, UserLoginReqDto } from './dto/login.req.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiPublic({
    type: LoginResDto,
    summary: 'Sign in',
  })
  @Post('admin/login')
  async adminLogin(@Body() adminLogin: AdminLoginReqDto): Promise<LoginResDto> {
    return await this.authService.adminLogin(adminLogin);
  }

  @ApiPublic({
    type: LoginResDto,
    summary: 'Sign in',
  })
  @Post('user/email/login')
  async userLogin(@Body() userLogin: UserLoginReqDto): Promise<LoginResDto> {
    return await this.authService.userLogin(userLogin);
  }


  // @ApiPublic()
  // @Post('email/register')
  // async register(@Body() dto: RegisterReqDto): Promise<RegisterResDto> {
  //   return await this.authService.register(dto);
  // }

  // @ApiAuth({
  //   summary: 'Logout',
  //   errorResponses: [400, 401, 403, 500],
  // })
  // @Post('logout')
  // async logout(@CurrentUser() userToken: JwtPayloadType): Promise<void> {
  //   await this.authService.logout(userToken);
  // }

  // @ApiPublic({
  //   type: RefreshResDto,
  //   summary: 'Refresh token',
  // })
  // @Post('refresh')
  // async refresh(@Body() dto: RefreshReqDto): Promise<RefreshResDto> {
  //   return await this.authService.refreshToken(dto);
  // }

  // @ApiPublic()
  // @Post('forgot-password')
  // async forgotPassword() {
  //   return 'forgot-password';
  // }

  // @ApiPublic()
  // @Post('verify/forgot-password')
  // async verifyForgotPassword() {
  //   return 'verify-forgot-password';
  // }

  // @ApiPublic()
  // @Post('reset-password')
  // async resetPassword() {
  //   return 'reset-password';
  // }

  // @ApiPublic()
  // @Get('verify/email')
  // async verifyEmail(@Query('token') token: string) {
  //   return await this.authService.verifyEmail(token);
  // }

  // @ApiPublic()
  // @Post('verify/email/resend')
  // async resendVerifyEmail() {
  //   return 'resend-verify-email';
  // }
}
