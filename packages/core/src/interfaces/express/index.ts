import type { UserPayload, JwtPayload } from './payload.interface.js';

declare module 'express' {
  export interface Request {
    user?: UserPayload;
    jwt?: JwtPayload;
  }
}
