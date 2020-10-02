import { Service, Inject } from 'typedi';
import { IUser, IFile } from '../interfaces';

@Service()
export default class UserService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('logger') private logger,
  ) { }

  public async search(text: string, options) {
    try {
      let result: Array<IUser> = [];
      const regex = new RegExp(text, 'i'); 
      return await this.userModel.find({ $or: [{ 'name': regex }, { 'email': regex }] }, null, options)
      .select(["name","email","social","status","role", 'avathar'])
       
    }
    catch (e) {
      this.logger.error(e)
      throw e;
    }
  }
  public async update(user: IUser, updates: IUser) {
    try {
      await this.userModel.updateOne({ _id: user._id }, updates)
      return { message: 'updated successfully' }
    }
    catch (e) {
      e['status'] = 409;
      this.logger.error(e)
      throw e
    }
  }
  public async updateAvatar(user: IUser, fileName: string) {
    try {
      let avatar = 'baseURL/' + user._id + '/' + fileName // need to fix
      await this.userModel.updateOne({ _id: user._id }, { avatarFile: fileName, avatar })
      return { message: 'avatar updated successfully ', avatar, avatarFile: fileName }
    }
    catch (e) {
      this.logger.info(e)
      throw e
    }
  }
  public async getUserProfile(user: IUser) {
    try {
      return await this.userModel.findById(user)
      .select(["name","email","social","status","role", 'avathar'])
          .populate('fileCount');
    }
    catch (e) {
      this.logger.error(e)
      throw e
    }
  }
}