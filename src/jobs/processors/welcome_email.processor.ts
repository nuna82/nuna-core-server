import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_NAME } from 'src/constants';
import { MailersService } from 'src/mailers/mailers.service';

@Processor(QUEUE_NAME)
export class WEProcessor {
  constructor(private readonly mailerService: MailersService) {}

  @Process('WEProcessor')
  async HandleWEP(job: Job<{ email: string; name: string; title: string }>) {
    try {
      console.log('🔨 Job received:', job.data);
      await this.mailerService.sendCode(` <h2>Welcome to Nunaland, ${job.data.name}</h2>
      <p>Welcome to Nunaland, where communities thrive, ideas spark, and voices are heard! We’re excited to have you on board. Whether you're here to discover new topics, join engaging discussions, or even build your own community—this is your space.</p>`, job.data.email);
      console.log('✅ Welcome email send');
    } catch (err) {
      console.error('❌ WEP Job failed:', err);
    }
  }
}


// {
//         to: job.data.email,
//         subject: job.data.title,
//         html: `
//      
//       `,
//       }