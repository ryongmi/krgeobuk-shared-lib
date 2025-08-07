import type { UserPayload, AuthenticatedJwt } from './payload.interface.js';

declare module 'express' {
  export interface Request {
    user?: UserPayload;
    jwt?: AuthenticatedJwt;
  }
}

