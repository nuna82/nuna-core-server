import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { QUEUE_NAME } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';

@Processor(QUEUE_NAME)
export class ICCProcessor {
  private readonly prisma: PrismaService;
  private readonly logger = new Logger(ICCProcessor.name);

  @Process('ICCProcessor')
  async handleICCP(job: Job<{ user_id: number }>) {
    this.logger.log(`processing in backgraund ${job.data.user_id}`);
    await this.prisma.user.update({
      where: { id: job.data.user_id },
      data: {
        collection_count: {
          increment: 1,
        },
      },
    });
  }
}
