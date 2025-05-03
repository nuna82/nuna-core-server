import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AppJwtModule } from 'src/jwt/jwt.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [AppJwtModule, PrismaService],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
