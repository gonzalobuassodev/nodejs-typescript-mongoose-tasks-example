import mongoose from 'mongoose';
// import dotenv from 'dotenv';

const options: mongoose.ConnectOptions = {
  dbName: process.env.DB_NAME as string,
  //   user: process.env.DB_USER as string,
  //   pass: process.env.DB_PASS as string,
};

export const connectDB = async () => {
  await mongoose.connect(process.env.DB_CONNECTION as string, options);
  console.log('Connected to database');
};
