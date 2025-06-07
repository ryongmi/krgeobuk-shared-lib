export interface ResponseFormatInterface<T> {
  statusCode: number;
  isLogin: boolean;
  data: T;
}
