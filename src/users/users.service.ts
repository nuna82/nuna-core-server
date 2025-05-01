import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    const users = this.prisma.user.findMany({
      include: {
        profile: true,
      },
    });
    if (!users) {
      throw new HttpException('enternal server error', 404);
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: {
        profile: true,
      },
    });
    if (!user) {
      throw new HttpException('user is not defined', 404);
    }
    return user;
  }

  async update(id: number, data: UpdateUserDto, req: RequestWithUser) {
    const user = req.user;
    if (user.id !== id) {
      throw new HttpException(
        'Id does not match with id provided in token',
        404,
      );
    }
    const { profile, ...user_data } = data;
    const updated_user = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        ...user_data,
        profile: profile
          ? {
              upsert: {
                create: {
                  original: profile.original ?? '',
                  thumbnail: profile.thumbnail ?? '',
                },
                update: {
                  original: profile.original ?? undefined,
                  thumbnail: profile.thumbnail ?? undefined,
                },
              },
            }
          : undefined,
      },
      include: {
        profile: true,
      },
    });
    if (!updated_user) {
      throw new HttpException(
        'external server error or user is not defined',
        404,
      );
    }
    return updated_user;
  }

  async remove(id: number, req: RequestWithUser) {
    const user_id = req.user.id;
    if (id !== user_id) {
      throw new HttpException(
        'Id does not match with id provided in token',
        404,
      );
    }
    const removed_user = await this.prisma.user.delete({
      where: { id: user_id },
    });
    if (!removed_user) {
      throw new HttpException('internal server error', 404);
    }
  }
}
