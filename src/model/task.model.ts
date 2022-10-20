import mongoose from 'mongoose';

export interface InterfaceTask {
  id: string;
  title: string;
  description: string;
}

const taskSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const TaskModel = mongoose.model('Task', taskSchema);
