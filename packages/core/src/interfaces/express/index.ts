import { UserPayload } from './user-payload.interface';

declare module 'express' {
  export interface Request {
    user?: UserPayload;
  }
}
