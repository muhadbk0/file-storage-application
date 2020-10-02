import { Service, Inject } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcrypt';
import { IUser,IUserInputDTO } from '../interfaces/IUser';

@Service()
export default class AuthService {
  constructor(
    @Inject('userModel') private userModel: Models.UserModel,
    @Inject('logger') private logger,
  ) { }

  public async register(user:IUserInputDTO) {
    try {
      const userRecord = await this.userModel.findOne({ email:user.email });
      this.logger.silly('Hashing password');
      const hashedPassword = await bcrypt.hash(user.password, 8)
      // verification Email Here
      // this.logger.silly('Sending welcome email');
      // await this.mailer.SendWelcomeEmail(userRecord);

      if (!userRecord) {
        this.logger.silly('Creating user db record')
        await this.userModel.create( {...user, password:hashedPassword } as IUser)
        return {data:{ status: "success" } ,status:201}
      }
      else { 
        return {data:{ status: "Email already Registred, Please login "} ,status:429}
      }
      
    } catch (e) {
      console.log(e)
      throw e;
    }
  }
  public async login(user:IUserInputDTO) {
    const userRecord = await this.userModel.findOne({email:user.email});
    if (!userRecord) {
      return { data: "User not registered", status: 404 } 
      //throw new Error('User not registered');
    }
    this.logger.silly('Checking password');
    try{
    const validPassword = await bcrypt.compare(user.password, userRecord.password);
    if (validPassword) {
      this.logger.silly('Password is valid!');
      this.logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);
      // updating user status 
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      /**
       * Easy as pie, you don't need passport.js anymore :)
       */
      return { data:{ user, token }, status: 201 }
    } else {
      return { data: "Invalid Password", status: 401 }
    }
  }
  catch(e){
    return { data: "Password Validation failed", status: 429 }
  }
  }

  private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: user.role,
        phone: user.email,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}
