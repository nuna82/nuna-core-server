import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { QUEUE_NAME } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';

// src/jobs/processors/increment_collection_count.processor.ts
@Processor(QUEUE_NAME)
export class ICCProcessor {
  constructor(private readonly prisma: PrismaService) {}

  @Process('ICCProcessor')
  async handleICCP(job: Job<{ user_id: number }>) {
    try {
      console.log('🔨 Job received:', job.data);
      const collections = await this.prisma.collection.findMany({
        where: { creator_id: job.data.user_id },
      });
      await this.prisma.user.update({
        where: { id: job.data.user_id },
        data: {
          collection_count: collections.length,
        },
      });
      console.log('✅ Collection count incremented');
    } catch (err) {
      console.error('❌ Job failed:', err);
    }
  }
}
