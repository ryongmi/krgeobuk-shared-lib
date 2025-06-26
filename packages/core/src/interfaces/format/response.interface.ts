export interface ResponseFormat<T> {
  code: string;
  statusCode: number;
  message: string;
  isLogin: boolean;
  data: T;
}
