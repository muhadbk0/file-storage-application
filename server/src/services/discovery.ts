import { Service, Inject } from 'typedi';
import { IUser, IFile } from '../interfaces';
import videoStructure from '../util/fileStructure';
import userStructure from '../util/userStructure';
@Service()
export default class DiscoveryService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('videoModel') private videoModel: Models.FileModel,
    @Inject('logger') private logger,
  ) { }

  public async getHome(user: IUser, options) {
    try {
     
      const home = await this.videoModel.find({}, ["title","file","hashtags","description","category_name","updatedAt"], options).populate('viewCount') //.populate('viewCount')//.sort({ _id: -1 }).limit(10) viewcount not nessosery here 
        .populate('likesCount').populate('liked', null, { user: user }) 
        .populate('owner').exec();
        return home.map(video=>({
          user: userStructure(video.owner as IUser),
          video: videoStructure(video as IFile)
        }));
    }
    catch (e) {
      this.logger.error(e)
      throw e
    }
  }

  public async getUserProfile(user: IUser, currentUser: IUser, options) {
    try {
      const [videos, userdetails] =  await Promise.all ([ 
       this.videoModel.find({ owner: user }, null, options).populate('viewCount').populate('likesCount'),
       this.userModel.findById(user).populate('videoCount')
       .populate('followed')
       .populate('followersCount').populate('followingCount').populate('likesTotal') //.sort({ _id: -1 }).limit(10);;
      ])
      const data = {
        profile: userdetails, 
        videos: videos 
      }
      return data
    }
    catch (e) {
      this.logger.error(e)
      throw e
    }
  }



}