import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { GenerateFriendlyIdService } from 'src/global/generate_friendly_id/generate_friendly_id.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly fiendlyId: GenerateFriendlyIdService,
  ) {}

  async create(req: RequestWithUser, data: CreatePostDto) {
    const user_id = req.user.id;
    const { images, collection_id, ...post_data } = data;
    try {
      const new_post = await this.prisma.post.create({
        data: {
          ...post_data,
          friendly_id: this.fiendlyId.generate(post_data.title),
          creator: { connect: { id: user_id } },
          ...(collection_id && {
            collection: { connect: { id: collection_id } },
          }),
          images: {
            create: images.map((image) => ({
              original: image.original,
              thumbnail: image.thumbnail,
            })),
          },
        },
        include: {
          images: true,
        },
      });
      return new_post;
    } catch (err) {
      throw new HttpException('error in create post section', 404);
    }
  }

  async findMany(skip: number, take: number) {
    if (skip > take) {
      throw new HttpException('take should be greater then skip', 404);
    }
    const posts = await this.prisma.post.findMany({
      skip,
      take,
      include: {
        images: true,
        creator: true,
      },
    });
    if (!posts) {
      throw new HttpException('error in posts section', 404);
    }
    return posts;
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: { id: id },
      include: {
        images: true,
        creator: true,
        collection: true,
      },
    });
    if (!post) {
      throw new HttpException('post does not found', 404);
    }
    return post;
  }

  async update(req: RequestWithUser, id: number, data: UpdatePostDto) {
    const user_id = req.user.id;
    try {
      const { collection_id, ...post_data } = data;
      const updated_post = await this.prisma.post.update({
        where: { id: id, creator_id: user_id },
        data: {
          ...post_data,
          ...(collection_id && {
            collection: { connect: { id: collection_id } },
          }),
        },
        include: {
          images: true,
          collection: true,
          creator: true,
        },
      });
      return updated_post;
    } catch (err) {
      throw new HttpException('error in post updating section', 404);
    }
  }

  async remove(req: RequestWithUser, id: number) {
    const user_id = req.user.id;
    try {
      const deleted_post = await this.prisma.post.delete({
        where: { id: id, creator_id: user_id },
      });
      return deleted_post;
    } catch (err) {
      throw new HttpException(`error in post removing setion:`, 404);
    }
  }
}
