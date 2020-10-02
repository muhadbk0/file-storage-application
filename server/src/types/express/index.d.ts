import { Document, Model } from 'mongoose';
import { IUser, IFile  } from '../../interfaces';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }    
  }
  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type FileModel = Model <IFile & Document>;
  }
}
