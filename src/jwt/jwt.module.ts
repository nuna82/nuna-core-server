import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt_nuna_token_secret_2dyn8',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  exports: [JwtModule],
})
export class AppJwtModule {}
