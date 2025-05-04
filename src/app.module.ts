import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MailersModule } from './mailers/mailers.module';
import { AppJwtModule } from './jwt/jwt.module';
import { GlobalModule } from './global/global.module';
import { UsersModule } from './users/users.module';
import { CollectionsModule } from './collections/collections.module';
import { PostsModule } from './posts/posts.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
  imports: [PrismaModule, AuthModule, MailersModule, AppJwtModule, GlobalModule, UsersModule, CollectionsModule, PostsModule, JobsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
