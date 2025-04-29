import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) {}

  async registerNewUser(data: RegisterDto) {
    const token = this.jwtService.sign({
      email: data.email,
      name: data.name,
    });
    const magicLink = `${process.env.origin}/auth/verify-magic-link/?token=${token}`;
    try {
      this.mailerService.sendMail({
        to: data.email,
        subject: 'Nuna - Verify your email',
        html: `
        <h4>click the link below and verify your accaunt in easy way</h4>
        <a href="${magicLink}"> Registrate </a>
        <p> Click the magic Link in top </p>
        `,
      });
      console.log(`Link successfully send to ${data.email}`);
    } catch (err) {
      console.log(`mailer error: ${err}`);
    }
  }

  async verifyNewUser(token: string) {
    const payload = this.jwtService.verify(token);
    const existing_user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });
    if (!existing_user) {
        // const new_user = await this.prisma.user.create()
    }
  }
}
