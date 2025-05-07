import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_NAME } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Processor(QUEUE_NAME)
export class CPCProcessor {
  constructor(private readonly prisma: PrismaService) {}

  @Process('CPCProcessor')
  async handleCPCP(job: Job<{ user_id: number; increment: boolean }>) {
    try {
      console.log('🔨 Job received:', job.data);
      if (job.data.increment === true) {
        await this.prisma.user.update({
          where: { id: job.data.user_id },
          data: {
            post_count: { increment: 1 },
          },
        });
        console.log('✅ Post count incremented');
      } else {
        await this.prisma.user.update({
          where: { id: job.data.user_id },
          data: {
            post_count: { decrement: 1 },
          },
        });
        console.log('✅ Post count decremented');
      }
    } catch (err) {
      console.log(`❌ DCCP Job failed:', err`);
    }
  }
}
