import express, { Request, Response, NextFunction } from 'express';
import { createUser, getAllUsers, login } from '../controllers/user.controller';
import { TokenValidation } from '../middleware/varifyToken.middleware';

export const router = express.Router();

router.post('/login', async (req: Request, res: Response) => {
  await login(req, res);
});

router.post(
  '/createuser',
  async (req: Request, res: Response, next: NextFunction) => {
    await createUser(req, res, next);
  }
);

router.get(
  '/getusers',
  TokenValidation,
  async (req: Request, res: Response) => {
    await getAllUsers(req, res);
  }
);
