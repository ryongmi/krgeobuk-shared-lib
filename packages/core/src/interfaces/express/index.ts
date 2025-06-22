import { UserPayload, JwtPayload } from './payload.interface';

declare module 'express' {
  export interface Request {
    user?: UserPayload;
    jwt?: JwtPayload;
  }
}
