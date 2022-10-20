import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isNamedExports } from 'typescript';

export interface InterfacePayload {
  _id: string;
  iat: number;
}

export const TokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('auth-token');
    console.log(token);
    if (!token) return res.status(401).json('Access Denied');
    const payload = jwt.verify(
      token,
      process.env['JWT_SECRET'] as string
    ) as InterfacePayload;

    req.userId = payload._id;
    next();
  } catch (error) {
    res.status(400).send('Invalid Token');
  }
};
