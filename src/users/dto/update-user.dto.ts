import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserProfileDTO } from './user-profile.dto';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserProfileDTO)
  profile?: UserProfileDTO;

  @IsOptional()
  @IsString()
  banner?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
