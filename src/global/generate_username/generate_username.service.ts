import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GenerateUsernameService {
  constructor(private readonly prisma: PrismaService) {}

  randomSuffix() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  async generate(name: string) {
    let baseUsername = name
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/[^a-z0-9]/g, '');
    let username = baseUsername;
    let isUnique = false;

    while (!isUnique) {
      const existing_user = await this.prisma.user.findUnique({
        where: { username: username },
      });
      if (!existing_user) {
        isUnique = true;
      } else {
        username = `${baseUsername}${this.randomSuffix}`;
      }
    }
    return username;
  }
}
