import {
  IsValidGoogleId,
  IsValidGoogleEmail,
  IsValidGooglePicture,
  IsValidGoogleUsername,
  IsValidGoogleGivenName,
  IsValidGoogleFamilyName,
  IsValidGoogleLocale,
  IsValidGoogleEmailVerified,
} from '../../decorators/index.js';
import type { GoogleUserProfileResponse } from '../../interfaces/index.js';

export class GoogleUserProfileResponseDto implements GoogleUserProfileResponse {
  @IsValidGoogleId()
  id!: string;

  @IsValidGoogleUsername()
  name!: string;

  @IsValidGoogleEmail()
  email!: string;

  @IsValidGoogleEmailVerified()
  emailVerified!: boolean;

  @IsValidGoogleGivenName()
  givenName!: string;

  @IsValidGoogleFamilyName()
  familyName!: string;

  @IsValidGooglePicture()
  picture!: string;

  @IsValidGoogleLocale()
  locale!: string; // 사용자가 사용하는 언어 - 추후 i8n 세팅할때 이것도 타입으로 변경해야할듯
}

// {
//   "id": "110248495921238986420",
//   "name": "Aaron Parecki",
//   "email": "aaron.parecki@domain.com",
//   "email_verified": true,
//   "given_name": "Aaron",
//   "family_name": "Parecki",
//   "picture": "https://...",
//   "locale": "en"
// }
