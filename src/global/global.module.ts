import { Module } from '@nestjs/common';
import { GenerateUsernameService } from './generate_username/generate_username.service';

@Module({
  providers: [GenerateUsernameService]
})
export class GlobalModule {}
