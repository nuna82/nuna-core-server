import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { AppJwtModule } from 'src/jwt/jwt.module';
import { GlobalModule } from 'src/global/global.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QUEUE_NAME } from 'src/constants';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    AppJwtModule,
    PrismaModule,
    GlobalModule,
    BullModule.registerQueue({ name: QUEUE_NAME }),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
