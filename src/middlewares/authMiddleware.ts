import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import authSecret from '../auth/authSecret';

interface TokenPayLoad {
  id: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send();
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const authStructure = jwt.verify(token, authSecret.secret);

    const { id } = authStructure as TokenPayLoad;

    req.userId = id;

    return next();
  } catch {
    return res.status(401).send();
  }
}
