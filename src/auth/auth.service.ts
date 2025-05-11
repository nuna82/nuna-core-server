import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dtos/register.dto';
import { GenerateUsernameService } from 'src/global/generate_username/generate_username.service';
import { LoginUserDTO } from './dtos/login.dto';
import { RequestWithUser } from 'src/interfaces/request-with-user.interface';
import { InjectQueue } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/constants';
import { Queue } from 'bull';
import { MailersService } from 'src/mailers/mailers.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailersService: MailersService,
    private readonly gu_username: GenerateUsernameService,
    @InjectQueue(QUEUE_NAME) private readonly nunaland: Queue,
  ) { }

  async registerNewUser(data: RegisterDto) {
    const token = this.jwtService.sign({
      email: data.email,
      name: data.name,
    });
    const magicLink = `${process.env.ORIGIN}/auth/verify-magic-link/?token=${token}`;
    try {
      this.mailersService.sendCode(`<h4>click the link below and verify your accaunt in easy way</h4>
        <a href="${magicLink}"> Registrate </a>
        <p> Click the magic Link in top </p>`, data.email);
      console.log(`Link successfully send to ${data.email}`);
    } catch (err) {
      console.log(`mailer error: ${err}`);
    }

    // {
    //     to: data.email,
    //     subject: 'Nuna - Verify your email',
    //     html: `
    //     <h4>click the link below and verify your accaunt in easy way</h4>
    //     <a href="${magicLink}"> Registrate </a>
    //     <p> Click the magic Link in top </p>
    //     `,
    //   }

    return {
      success: true,
      message: `magic link sent to ${data.email}`,
    };
  }

  async verifyNewUser(token: string) {
    const payload = this.jwtService.verify(token);
    const existing_user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!existing_user) {
      const uniqueUsername = await this.gu_username.generate(payload.name);
      const new_user = await this.prisma.user.create({
        data: {
          name: payload.name,
          email: payload.email,
          username: uniqueUsername,
        },
      });
      if (new_user) {
        await this.nunaland.add('WEProcessor', {
          email: new_user.email,
          title: 'Welcome to Nunaland',
          name: new_user.name,
        });
        console.log('🌀 WEProcessor Job started');
      }
      return this.jwtService.sign(
        {
          id: new_user.id,
          email: new_user.email,
          username: new_user.username,
        },
        {
          expiresIn: '5d',
        },
      );
    } else {
      return this.jwtService.sign(
        {
          id: existing_user.id,
          email: existing_user.email,
          username: existing_user.username,
        },
        {
          expiresIn: '5d',
        },
      );
    }
  }

  async logTheUserIn(data: LoginUserDTO) {
    const the_user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!the_user) {
      throw new HttpException('user does not exist', 404);
    }
    const token = this.jwtService.sign({
      email: data.email,
    });
    const magicLink = `${process.env.ORIGIN}/auth/verify-magic-link/?token=${token}`;
    try {
      this.mailersService.sendCode(`<h4>click the link below and verify your accaunt in easy way</h4>
         <a href="${magicLink}"> Registrate </a>
         <p> Click the magic Link in top </p>`, data.email);
      console.log(`Link successfully send to ${data.email}`);
    } catch (err) {
      console.log(`mailer error: ${err}`);
    }

    // {
    //     to: data.email,
    //     subject: 'Nuna - Verify your email',
    //     html: `
    //     
    //     `,
    //   }

    return {
      success: true,
      message: `magic link sent to ${data.email}`,
    };
  }

  async getUsersProfile(req: RequestWithUser) {
    const user_data = req.user;
    const the_user = await this.prisma.user.findUnique({
      where: { id: user_data.id },
      include: {
        profile: true,
      },
    });
    if (!the_user) {
      throw new HttpException('invalid Token or user does not exist', 404);
    }
    return the_user;
  }
}
