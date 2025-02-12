import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import envConfig from '../config/env.config';

const authenticateJWT = async (req: Request, res: Response, next: NextFunction): Promise<any> =>{
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ status: false, message: 'No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, envConfig.JWT_SECRET!);
    req.user = decoded; 
    next();
  } catch (err:any) {
    let message = err.message === 'jwt expired' ? 'Token has expired'
      : (err.message === "invalid token" || err.message === "invalid signature") ? "Token is not valid" : err.message;
    return res.status(401).json({ status: false, message });
  }
};

const authorization = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    let userId = Number(req.query.user_id);
    if (req.user.id !== userId) {
      return res.status(403).json({ status: false, message: 'Access denied. Unauthorized user.' });
    }
    next();
  } catch (error:any) {
    return res.status(500).json({ status: false, message: error.message });
  }

}

export { authenticateJWT, authorization };