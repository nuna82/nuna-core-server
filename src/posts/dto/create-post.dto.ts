import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PostImageDto } from './create-post-image.dto';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsInt()
  collection_id: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PostImageDto)
  images: PostImageDto[];
}
