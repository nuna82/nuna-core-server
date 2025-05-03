import { Module } from '@nestjs/common';
import { GenerateUsernameService } from './generate_username/generate_username.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GenerateFriendlyIdService } from './generate_friendly_id/generate_friendly_id.service';

@Module({
  imports: [PrismaModule],
  providers: [GenerateUsernameService, GenerateFriendlyIdService],
  exports: [GenerateUsernameService, GenerateFriendlyIdService],
})
export class GlobalModule {}
