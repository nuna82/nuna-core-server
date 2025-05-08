import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_NAME } from 'src/constants';

@Processor(QUEUE_NAME)
export class WEProcessor {
  constructor(private readonly mailerService: MailerService) {}

  @Process('WEProcessor')
  async HandleWEP(job: Job<{ user_id: string; name: string; title: string }>) {}
}
