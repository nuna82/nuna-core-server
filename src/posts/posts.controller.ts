import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post('/new')
  create(@Req() req: RequestWithUser, @Body() dto: CreatePostDto) {
    return this.postsService.create(req, dto);
  }

  @Get('many')
  findMany(@Query('skip') skip: string, @Query('take') take: string) {
    return this.postsService.findMany(+skip || 0, +take || 10);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @UseGuards(AuthGuard)
  @Put('/update/:id')
  update(
    @Req() req: RequestWithUser,
    @Param('id') id: string,
    @Body() data: UpdatePostDto,
  ) {
    return this.postsService.update(req, +id, data);
  }

  @UseGuards(AuthGuard)
  @Delete('remove/:id')
  remove(@Req() req: RequestWithUser, @Param('id') id: string) {
    return this.postsService.remove(req, +id);
  }
}
