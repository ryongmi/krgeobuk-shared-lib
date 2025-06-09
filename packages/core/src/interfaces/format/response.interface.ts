export interface ResponseFormat<T> {
  statusCode: number;
  isLogin: boolean;
  data: T;
}
