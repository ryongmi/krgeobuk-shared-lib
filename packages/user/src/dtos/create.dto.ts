import {
  IsValidEmail,
  IsValidNickname,
  IsValidPassword,
  IsValidProfileImage,
  IsValidUsername,
} from '@krgeobuk/user/src/decorators';
import { OptionalUuidIdDto } from '@krgeobuk/core/dtos';

export class CreateUserDto extends OptionalUuidIdDto {
  @IsValidEmail()
  email!: string;

  @IsValidPassword()
  password!: string;

  @IsValidUsername()
  name!: string;

  @IsValidNickname({ isOptional: true })
  nickname?: string;

  @IsValidProfileImage({ isOptional: true })
  profileImage?: string;
}
