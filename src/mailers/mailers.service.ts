import { Injectable } from '@nestjs/common';
import * as nodemailer from "nodemailer";
import { Transporter } from "nodemailer";


@Injectable()
export class MailersService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            }
        });
    }
    sendCode(text: string, email: string) {
        this.transporter.sendMail({
            from: `"Muhammadali's auth" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Checking",
            html: `<h1 style="color:red;">${text}</h1> <p>hello</p> <strong>${email}</strong>`
        });
    }
}

// import { MailerModule } from '@nestjs-modules/mailer';
// import { Module } from '@nestjs/common';
// import { join } from 'path';
// import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { MailersService } from './mailers.service';
// import { MailersController } from './mailers.controller';

// @Module({
//   imports: [
//     MailerModule.forRoot({
//       transport: {
//         service: 'gmail',
//         host: 'smtp.gmail.com',
//         port: 587,
//         sourse: false,
//         auth: {
//           user: process.env.SMTP_USER,
//           pass: process.env.SMTP_PASS,
//         },
//       },
//       defaults: {
//         from: '"Nuna" 82mailer@gmail.com',
//       },
//       template: {
//         dir: join(__dirname, '..', 'templates'),
//         adapter: new HandlebarsAdapter(),
//         options: {
//           strict: true,
//         },
//       },
//     }),
//   ],
//   exports: [MailerModule],
//   providers: [MailersService],
//   controllers: [MailersController],
// })
// export class MailersModule {}