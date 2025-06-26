import type { LoggedInUser } from '@krgeobuk/user/interfaces';

export interface LoginResponse {
  accessToken: string;
  user: LoggedInUser;
}
