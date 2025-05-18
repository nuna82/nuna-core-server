import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  @UseGuards(AuthGuard)
  @Put('/update/:id')
  update(
    @Query('id') id: string,
    @Body() data: UpdateUserDto,
    @Req() req: RequestWithUser,
  ) {
    return this.usersService.update(+id, data, req);
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  remove(@Param('id') id: string, @Req() req: RequestWithUser) {
    return this.usersService.remove(+id, req);
  }
}
