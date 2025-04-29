import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() data: RegisterDto) {
    await this.authService.registerNewUser(data);
  }

  @Get('/verify-magic-link')
  async verifyNewUser(@Query('token') token: string) {
    await this.authService.verifyNewUser(token);
  }
}
