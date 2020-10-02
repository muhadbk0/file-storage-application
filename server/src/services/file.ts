import { Service, Inject } from 'typedi';
import { IUser, IFile } from '../interfaces';


@Service()
export default class FileService {
  constructor(
    @Inject('fileModel') private fileModel: Models.FileModel,
    @Inject('logger') private logger,
  ) { }
  public async search(user: IUser, text: string, options) {
    try {
      const regex = new RegExp(text, 'i'); //{$text: {$search: text}}
      const result = await this.fileModel.find({ title: regex },
        ["name", "file_path", "owner"], options)
      return result.map(file => ({
        user: (file.owner as IUser),
        file: (file as IFile)
      }));
    }
    catch (e) {
      this.logger.error(e)
      throw e;
    }
  }

  public async list(user: IUser, options) {
    try {
      const quary = user.role==='admin'?{}:{ owner: user }
      const result = await this.fileModel.find(quary,
        ["name", "file_path", "owner"], options)
      return result.map(file => ({
        user: (file.owner as IUser),
        file: (file as IFile)
      }));
    }
    catch (e) {
      this.logger.error(e)
      throw e;
    }
  }
  public async delete(file: IFile, owner: IUser) {
    try {
      await this.fileModel.findByIdAndDelete(file._id)
      return { message: "success" }
    }
    catch (e) {
      this.logger.error(e)
      throw e;
    }
  }
 

  public async fileUpload(user: IUser, fileName: string) {
    try {
      let file_path = 'baseURL/' + user._id + '/' + fileName // need to fix

      // await this.fileModel.create({
      //   ...file,
      //   file_path,
      //   owner
      // } as IFile);
      // await this.fileModel.updateOne({ _id: user._id }, { avatarFile: fileName, avatar })
      return { message: 'avatar updated successfully ', }
    }
    catch (e) {
      this.logger.info(e)
      throw e
    }
  }



  public async update(file: IFile, owner: IUser) {
    try {
      // await this.fileModel.updateOne({ _id: file }, })
      return { message: "success" }
    }
    catch (e) {
      this.logger.error(e)
      throw e;
    }
  }

}