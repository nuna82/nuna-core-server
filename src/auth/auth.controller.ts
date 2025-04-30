import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginUserDTO } from './dtos/login.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Request } from 'express';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async registerUser(@Body() data: RegisterDto) {
    return await this.authService.registerNewUser(data);
  }

  @Get('/verify-magic-link')
  async verifyNewUser(@Query('token') token: string) {
    return await this.authService.verifyNewUser(token);
  }

  @Post('/login')
  async logUserIn(@Body() data: LoginUserDTO) {
    return await this.authService.logTheUserIn(data);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getUsersProfileData(@Req() req: RequestWithUser) {
    return await this.authService.getUsersProfile(req);
  }
}
