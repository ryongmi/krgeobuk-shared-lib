import type { LoggedInUser } from '@krgeobuk/shared/user';

export interface AuthLoginResponse {
  accessToken: string;
  user: LoggedInUser;
}
