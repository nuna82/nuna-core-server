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

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
