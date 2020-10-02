interface ISocial{
  name:string
  url:string
}

export interface IUser {
  _id: string
  name: string
  username:string
  phone: string
  email: string
  role:string
  password: string
  status:string
  avatar: string
  social:Array<ISocial> 
  about: string
}
export interface IUserInputDTO {
  name: string
  email: string
  password: string
}
