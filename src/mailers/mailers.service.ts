import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class MailersService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  sendCode(text: string, email: string) {
    this.transporter.sendMail({
      from: `"Nunaland" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Checking',
      html: `<h1 style="color: red;">${text}</h1> <p>hello</p> <strong>${email}</strong>`,
    });
  }
}
