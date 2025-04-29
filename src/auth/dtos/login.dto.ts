import { IsString } from 'class-validator';

export class LoginUserDTO {
  @IsString()
  email: string;
}
