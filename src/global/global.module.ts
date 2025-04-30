import { Module } from '@nestjs/common';
import { GenerateUsernameService } from './generate_username/generate_username.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [GenerateUsernameService],
  exports: [GenerateUsernameService],
})
export class GlobalModule {}
