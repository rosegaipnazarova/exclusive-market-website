import { type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Token topilmadi!" });

  jwt.verify(token, process.env.JWT_SECRET || 'maxfiy_kalit', (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Token yaroqsiz!" });
    req.user = user;
    next();
  });
};