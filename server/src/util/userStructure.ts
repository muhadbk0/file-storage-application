import { IUser } from '../interfaces/IUser';
export default (user:IUser ) => Object.freeze({  
    ...user   
})