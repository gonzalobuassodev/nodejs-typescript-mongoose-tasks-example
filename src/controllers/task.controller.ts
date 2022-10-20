import { InterfaceTask, TaskModel } from '../model/task.model';
import { Request, Response } from 'express';

export const getAllTasks = async (req: Request, res: Response) => {
  const result = await TaskModel.find();
  res.send(result);
};

export const getTask = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  if (id) {
    try {
      console.log(id);
      const result = await TaskModel.findById({ _id: id });

      console.log(result);
      res.send(result);
    } catch (error) {
      res.send({ error: 'Hubo un error' });
    }
  } else {
    res.send({ error: 'Hubo un error' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description }: InterfaceTask = req.body;
  if (title || description) {
    try {
      const newTask = new TaskModel({ title, description });
      const result = await newTask.save();
      console.log('Tesk added successfully');
      res.send(result);
    } catch (error) {
      res.send({ error: 'Hubo un error' });
    }
  } else {
    res.send({ error: 'Faltan datos' });
  }
};
