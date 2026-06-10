import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';

const jwtSecret = process.env.JWT_SECRET ?? 'changeme';

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token não informado' });
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const payload = jwt.verify(token, jwtSecret) as { user_id: number; email: string; role: string };
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
