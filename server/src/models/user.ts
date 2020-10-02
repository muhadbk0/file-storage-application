import { IUser } from '../interfaces/IUser'
import mongoose from 'mongoose'

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    password: {
      type: String,
      unique: true,
      minlength: 6,
    }, 
    status: {
      type: String,
      enum: ['active', 'pending', 'rejected', 'baned', 'spam'],
      default: 'pending',
      required: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true
    },
    about: {
      type: String
    },
    age: Number,
    sex: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    avatar: {
      type: String
    },
    social: [{
      name: String,
      url: String,
    }],
  },
  {
    toObject : {virtuals :true},
    toJSON : {virtuals :true},
    timestamps : true
  },
 
)
User.virtual('fileCount', {
  ref: 'File',
  localField: '_id',
  foreignField: 'owner',
  count: true 
});

export default mongoose.model<IUser & mongoose.Document>('User', User)
