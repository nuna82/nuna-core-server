import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  onModuleInit() {
    this.$connect()
      .then(() => {
        const info = `${Date.now()}: successfully connected to database`;
        console.log(info);
      })
      .catch((err) => {
        const info = `error while connecting to database: ${err}`;
        console.log(info);
      });
  }
}
