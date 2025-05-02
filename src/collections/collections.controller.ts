import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';
import { CreateCollectionDto } from './dto/create_collection.dto';
import { CollectionsService } from './collections.service';

@Controller('collections')
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @UseGuards(AuthGuard)
  @Post('new')
  createNewColletion(
    @Req() req: RequestWithUser,
    @Body() data: CreateCollectionDto,
  ) {
    return this.collectionsService.create(req, data);
  }

  @UseGuards(AuthGuard)
  @Get('mine')
  getMyCollections(@Req() req: RequestWithUser) {
    return this.collectionsService.getMyCollections(req);
  }

  @Get(':id')
  getCollectionById(@Param('id') id: string) {
    return this.collectionsService.getCollectionById(+id);
  }
}
