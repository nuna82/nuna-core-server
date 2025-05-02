import { HttpException, Injectable } from '@nestjs/common';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCollectionDto } from './dto/create_collection.dto';

@Injectable()
export class CollectionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(req: RequestWithUser, data: CreateCollectionDto) {
    const user = req.user;
    const new_collection = await this.prisma.collection.create({
      data: {
        ...data,
        creator: {
          connect: { id: user.id },
        },
      },
    });
    if (!new_collection) {
      throw new HttpException('server error', 404);
    } else {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          collection_count: {
            increment: 1,
          },
        },
      });
    }
    return new_collection;
  }

  async getMyCollections(req: RequestWithUser) {
    const user_id = req.user.id;
    const collections = await this.prisma.collection.findMany({
      where: { creator_id: user_id },
    });
    if (!collections) {
      throw new HttpException('server error', 404);
    }
    return collections;
  }

  async getCollectionById(id: number) {
    const collection = await this.prisma.collection.findUnique({
      where: { id: id },
      include: {
        creator: true,
      },
    });
    if (!collection) {
      throw new HttpException('collection does not exist', 404);
    }
    return collection;
  }
}
