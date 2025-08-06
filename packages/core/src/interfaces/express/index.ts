import type { UserPayload, AuthenticatedUser } from './payload.interface.js';

declare module 'express' {
  export interface Request {
    user?: UserPayload;
    jwt?: AuthenticatedUser;
  }
}

