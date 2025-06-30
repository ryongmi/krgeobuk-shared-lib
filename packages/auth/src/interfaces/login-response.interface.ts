import type { LoggedInUser } from '@krgeobuk/user/interfaces';

export interface AuthLoginResponse {
  accessToken: string;
  user: LoggedInUser;
}
