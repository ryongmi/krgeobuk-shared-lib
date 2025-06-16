import { OptionalUuidIdDto } from '@krgeobuk/core/dtos';
import {
  IsValidEmail,
  IsValidNickname,
  IsValidPassword,
  IsValidProfileImage,
  IsValidUsername,
} from '@krgeobuk/user/src/decorators';
import type { CreateUser } from '@krgeobuk/user/src/interfaces';

export class CreateUserDto extends OptionalUuidIdDto implements CreateUser {
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
