import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_NAME } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Processor(QUEUE_NAME)
export class DCCProcessor {
  constructor(private readonly prisma: PrismaService) {}

  @Process('DCCProcessor')
  async handleDCCP(job: Job<{ user_id: number }>) {
    try {
      console.log('🔨 Job received:', job.data);
      await this.prisma.user.update({
        where: { id: job.data.user_id },
        data: {
          collection_count: { decrement: 1 },
        },
      });
      console.log('✅ Collection count incremented');
    } catch (err) {
      console.log(`❌ DCCP Job failed:', err`);
    }
  }
}
