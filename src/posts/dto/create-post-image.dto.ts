import { IsString } from 'class-validator';

export class PostImageDto {
  @IsString()
  original: string;

  @IsString()
  thumbnail: string;
}
