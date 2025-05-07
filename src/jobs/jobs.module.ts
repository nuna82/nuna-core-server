import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QUEUE_NAME } from 'src/constants';
import { ICCProcessor } from './processors/increment_collection_count.processor';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DCCProcessor } from './processors/decriment_collection_count.processor';
import { CPCProcessor } from './processors/change_post_count.processor';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: QUEUE_NAME,
    }),
    PrismaModule,
  ],
  providers: [ICCProcessor, DCCProcessor, CPCProcessor],
  exports: [BullModule],
})
export class JobsModule {}
