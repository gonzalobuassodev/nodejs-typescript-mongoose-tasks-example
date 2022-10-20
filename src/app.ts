import cors from 'cors';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import morgan from 'morgan';
import { join } from 'path';
import { connectDB } from './database';
import { router as TaskRouter } from './routes/task.routes';
import { router as UserRouter } from './routes/user.routes';

export const app: Application = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(join(__dirname, '../public/images')));
app.use(morgan('dev'));

connectDB();

app.use('/api/', TaskRouter);
app.use('/api/', UserRouter);

app.listen(process.env.PORT, () => {
  console.log('Server listen on port: ', process.env.PORT);
});
