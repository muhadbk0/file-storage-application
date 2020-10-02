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
      return await this.fileModel.find({ title: regex },
        ["name", "file_path", "owner"], options)
        .populate("owner",["name","email","social","status","role"]).exec()
    }
    catch (e) {
      this.logger.error(e)
      throw e;
    }
  }

  public async list(user: IUser, options) {
    try {
      const quary = user.role==='admin'?{}:{ owner: user }
      return await this.fileModel.find(quary,
        ["name", "extention","file_path", "owner"], options)
        .populate("owner",["name","email","social","status","role"]).exec()
    }
    catch (e) {
      this.logger.error(e)
      throw e;
    }
  }
  public async delete(file: IFile, owner: IUser) {
    try {
      const deletedFile  = await this.fileModel.findOneAndDelete({_id:file._id,owner})
      if(deletedFile)
        return { message: "success", file:deletedFile }
      return { message: "file not found" }
    }
    catch (e) {
      this.logger.error(e)
      throw e;
    }
  }
 
  public async create(file:IFile, owner: IUser) {
    try {
      await this.fileModel.create({
        ...file,
        owner
      } as IFile);
      return { message: 'file updated successfully ', file }
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