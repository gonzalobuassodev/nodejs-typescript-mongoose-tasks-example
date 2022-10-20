import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { InterfaceUser, UserModel } from '../model/user.model';
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password, name }: InterfaceUser = req.body;

  if (username || password || name) {
    try {
      const newUser = new UserModel({ username, password, name });

      newUser.password = await newUser.encryptPassword(newUser.password);

      const result = await newUser.save();

      const token: string = jwt.sign(
        { _id: result._id },
        process.env['JWT_SECRET'] as string
      );

      res.header('auth-token', token).send(result);
    } catch (error) {
      console.log(error);
      res.send({ message: error });
    }
  } else {
    res.send({ message: 'Invalid data' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password }: InterfaceUser = req.body;
  if (username || password) {
    try {
      let userFound = await UserModel.findOne({
        username,
      });

      if (userFound) {
        const userAutenticated = await userFound.validatePassword(password);

        if (userAutenticated) {
          const token: string = jwt.sign(
            { _id: userFound._id },
            process.env.JWT_SECRET || 'withoutSecret'
          );
          res.header('auth-token', token).json(userFound);
        } else {
          res.send({ error: 'Username or password mismatch' });
        }
      } else {
        res.send({ error: 'Username or password mismatch' });
      }
    } catch (error) {
      console.log(error);
      res.send({ error: error });
    }
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserModel.find({}, { password: 0 });
    res.send(result);
  } catch (error) {
    res.send({ error: error });
  }
};
