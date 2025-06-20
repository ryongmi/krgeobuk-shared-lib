export interface LoginResponse<T> {
  accessToken: string;
  user: T;
}
