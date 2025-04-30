import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsString()
  profile: string;

  @IsString()
  banner: string;

  @IsString()
  bio: string;
}
