import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_NAME } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Processor(QUEUE_NAME)
export class CCPCProcessor {
  constructor(private readonly prisma: PrismaService) {}

  @Process('CCPCProcessor')
  async handleCCPCP(job: Job<{ collection_id: number; increment: boolean }>) {
    try {
      console.log('🔨 Job received:', job.data);
      if (job.data.increment === true) {
        await this.prisma.collection.update({
          where: { id: job.data.collection_id },
          data: {
            post_count: { increment: 1 },
          },
        });
        console.log('✅ Collection Post count incremented');
      } else {
        await this.prisma.collection.update({
          where: { id: job.data.collection_id },
          data: {
            post_count: { decrement: 1 },
          },
        });
        console.log('✅ Collection Post count decremented');
      }
    } catch (err) {
      console.log(`❌ DCCP Job failed:', err`);
    }
  }
}
