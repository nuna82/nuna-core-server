

import { Module } from '@nestjs/common';
import { MailersService } from './mailers.service';

@Module({
  providers: [MailersService],
  exports: [MailersService]
})
export class MailersModule { }