import { Module } from '@nestjs/common';
import { CollectionsController } from './collections.controller';
import { CollectionsService } from './collections.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppJwtModule } from 'src/jwt/jwt.module';
import { JobsModule } from 'src/jobs/jobs.module';
import { BullModule } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/constants';

@Module({
  imports: [
    PrismaModule,
    AppJwtModule,
    JobsModule,
    BullModule.registerQueue({ name: QUEUE_NAME }),
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService],
})
export class CollectionsModule {}
