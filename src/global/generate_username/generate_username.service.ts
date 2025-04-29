import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenerateUsernameService {
  constructor(private readonly prisma: PrismaService) {}

  async generate(name: string) {
    let baseUsername = name
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
    let username = baseUsername;
    let isUnique = false;
    let count = 0;

    while (!isUnique) {
      const existing_user = await this.prisma.user.findUnique({
        where: { username: username },
      });
      if (!existing_user) {
        isUnique = true;
      } else {
        count++;
        username = `${baseUsername}${count}`;
      }
    }
  }
}
