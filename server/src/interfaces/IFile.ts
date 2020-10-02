import { IUser } from './IUser';
export interface IFile {
  _id: string
  name: string
  extention: string
  file_path:string
  owner: IUser
  updatedAt: number
}

export interface IFileInputDTO {
    name: string
    extention: string
    owner: IUser
}
