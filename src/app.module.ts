import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MailersModule } from './mailers/mailers.module';
import { AppJwtModule } from './jwt/jwt.module';
import { GlobalModule } from './global/global.module';

@Module({
  imports: [PrismaModule, AuthModule, MailersModule, AppJwtModule, GlobalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
