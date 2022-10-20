import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export interface InterfaceUser extends Document {
  username: string;
  password: string;
  name: string;
  encryptPassword(password: string): Promise<string>;
  validatePassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// userSchema.pre('save', function (next) {
//   if (this.isModified('passowrd') || this.isNew) {
//     const document = this;

//     bcrypt.hash(document.password, 10, (err, hash) => {
//       if (err) return next(err);
//       else {
//         document.password = hash;
//         next();
//       }
//     });
//   }
// });

userSchema.methods.encryptPassword = async (
  passowrd: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(passowrd, salt);
};

userSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model<InterfaceUser>('User', userSchema);
