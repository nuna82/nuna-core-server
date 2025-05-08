import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GlobalModule } from 'src/global/global.module';
import { AppJwtModule } from 'src/jwt/jwt.module';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/constants';

@Module({
  imports: [
    PrismaModule,
    AppJwtModule,
    GlobalModule,
    BullModule.registerQueue({ name: QUEUE_NAME }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
