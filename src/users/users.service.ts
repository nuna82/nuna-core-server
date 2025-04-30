import { HttpException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new HttpException('user is not defined', 404);
    }
    return user;
  }

  async update(data: UpdateUserDto, req: RequestWithUser) {
    const user_id = req.user.id;
    // const edited_user = await this.prisma.user.update({
    //   where: { id: user_id },
    // });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
