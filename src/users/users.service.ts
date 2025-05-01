import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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

  async update(data: UpdateUserDto, req: RequestWithUser) {
    const user = req.user;
    console.log(user);
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
