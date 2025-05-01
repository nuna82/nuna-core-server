import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppJwtModule } from 'src/jwt/jwt.module';

@Module({
  imports: [PrismaModule, AppJwtModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
