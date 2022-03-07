import { IUser, _IUser } from "../interface/user";
import setting from '../config/setting'
import jwt from 'jsonwebtoken'

export const generate_token = (user: any) => {

  const data = {
    _id: user._id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    status: true,
    token: '',
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }  

  const token = jwt.sign(data, `${setting.TOKEN.LOGIN}`)
  
  const result = {
    token,
    user: data
  }

  return result 
} 
