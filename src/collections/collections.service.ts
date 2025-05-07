import { HttpException, Injectable } from '@nestjs/common';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCollectionDto } from './dto/create_collection.dto';
import { UpdateCollectionDto } from './dto/update_collection.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { QUEUE_NAME } from 'src/constants';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectQueue(QUEUE_NAME) private readonly nunaland: Queue,
    private readonly prisma: PrismaService,
  ) {}

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
    if (new_collection) {
      await this.nunaland.add('ICCProcessor', { user_id: user.id });
      console.log('🌀 ICCProcessor Job added to queue for user_id:', user.id);
    } else {
      throw new HttpException('server error', 404);
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

  async update(id: number, req: RequestWithUser, data: UpdateCollectionDto) {
    const user_id = req.user.id;
    try {
      const updated_collection = await this.prisma.collection.update({
        where: { id: id, creator_id: user_id },
        data: {
          ...data,
        },
      });
      if (!updated_collection) {
        throw new HttpException('server error', 404);
      }
      return updated_collection;
    } catch (err) {
      throw new HttpException(`error in collection section ${err}`, 404);
    }
  }

  async remove(id: number, req: RequestWithUser) {
    const user_id = req.user.id;
    try {
      const deleted_collection = await this.prisma.collection.delete({
        where: { id: id, creator_id: user_id },
      });
      if (deleted_collection) {
        await this.nunaland.add('DCCProcessor', { user_id: user_id });
        console.log('🌀 DCCProcessor Job added to queue for user_id:', user_id);
      }
      return {
        success: true,
        message: 'collection updated',
      };
    } catch (err) {
      throw new HttpException(`error in collection section ${err}`, 404);
    }
  }
}
