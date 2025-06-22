export interface GoogleUserProfileResponse {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  givenName: string;
  familyName: string;
  picture: string;
  locale: string;
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
