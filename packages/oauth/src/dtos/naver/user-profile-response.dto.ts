import {
  IsValidNaverAge,
  IsValidNaverEmail,
  IsValidNaverBirthyear,
  IsValidNaverId,
  IsValidNaverNickname,
  IsValidNaverProfileImage,
  IsValidNaverGender,
  IsValidNaverUsername,
  IsValidNaverBirthday,
  IsValidNaverMobile,
} from '@krgeobuk/oauth/src/decorators';
import type { NaverUserProfileResponse } from '@krgeobuk/oauth/src/interfaces';
import type { NaverGenderTypeValue } from '@krgeobuk/oauth/src/types';

export class NaverUserProfileResponseDto implements NaverUserProfileResponse {
  @IsValidNaverId()
  id!: string;

  @IsValidNaverEmail()
  email!: string;

  @IsValidNaverNickname()
  nickname!: string;

  @IsValidNaverProfileImage()
  profileImage!: string;

  @IsValidNaverAge()
  age!: string;

  @IsValidNaverGender()
  gender!: NaverGenderTypeValue;

  @IsValidNaverUsername()
  name!: string;

  @IsValidNaverBirthday()
  birthday!: string;

  @IsValidNaverBirthyear()
  birthyear!: string;

  @IsValidNaverMobile()
  mobile!: string;
}

// {
//     "access_token":"AAAAQosjWDJieBiQZc3to9YQp6HDLvrmyKC+6+iZ3gq7qrkqf50ljZC+Lgoqrg",
//     "refresh_token":"c8ceMEJisO4Se7uGisHoX0f5JEii7JnipglQipkOn5Zp3tyP7dHQoP0zNKHUq2gY",
//     "token_type":"bearer",
//     "expires_in":"3600"
// }
