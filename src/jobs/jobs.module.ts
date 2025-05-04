import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { QUEUE_NAME } from 'src/constants';

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
  ],
  exports: [BullModule],
})
export class JobsModule {}
