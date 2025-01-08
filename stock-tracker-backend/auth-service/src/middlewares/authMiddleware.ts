import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import envConfig from '../config/env.config';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, envConfig.JWT_SECRET!);
    req.user = decoded; 
    next();
  } catch (error:any) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
