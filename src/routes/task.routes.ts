import express, { Request, Response, NextFunction } from 'express';
import {
  createTask,
  getAllTasks,
  getTask,
} from '../controllers/task.controller';
import { TokenValidation } from '../middleware/varifyToken.middleware';
import { InterfaceTask, TaskModel } from '../model/task.model';

export const router = express.Router();

router.get(
  '/getalltask',
  TokenValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllTasks(req, res);
    } catch (error) {
      res.send({ error: 'Hubo un error' });
    }
  }
);

router.get(
  '/gettask/:id',
  TokenValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    await getTask(req, res);
  }
);

router.post(
  '/createtask',
  TokenValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    await createTask(req, res);
  }
);
