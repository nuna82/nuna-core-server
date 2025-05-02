import { IsOptional, IsString } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  banner: string;
}
