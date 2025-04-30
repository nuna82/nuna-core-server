import { IsString } from 'class-validator';

export class UserProfileDTO {
  @IsString()
  original: string;

  @IsString()
  thumbnail: string;
}
