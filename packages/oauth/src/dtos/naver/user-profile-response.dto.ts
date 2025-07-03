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
} from '../../decorators/index.js';
import type { NaverUserProfileResponse } from '../../interfaces/index.js';
import type { NaverGenderType } from '../../enum/index.js';

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
  gender!: NaverGenderType;

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
//     "email": "openapi@naver.com",
//     "nickname": "OpenAPI",
//     "profile_image": "https://ssl.pstatic.net/static/pwe/address/nodata_33x33.gif",
//     "age": "40-49",
//     "gender": "F",
//     "id": "32742776",
//     "name": "오픈 API",
//     "birthday": "10-01",
//     "birthyear": "1900",
//     "mobile": "010-0000-0000"
//     "mobile_e164" = "+821012340000"
//   }
