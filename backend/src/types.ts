import { Request } from 'express';

export interface AuthPayload {
  user_id: number;
  email: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}
