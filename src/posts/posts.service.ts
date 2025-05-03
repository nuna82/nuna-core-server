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
      },
    });
    if (!post) {
      throw new HttpException('post does not found', 404);
    }
    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
