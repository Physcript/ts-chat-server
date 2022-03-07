


import User from '../model/User'
import setting from '../config/setting'
import jwt from 'jsonwebtoken'

export const find_by_name = async (name: string) => {
  
  const user = await User.findOne({ name })
  return user
}

export const find_by_email = async (email: string) => {
  const user = await User.findOne({ email })
  return user
}

export const check_token = async (token: string) => {
  const decode = await jwt.verify(token,`${setting.TOKEN.LOGIN}`, (error,decode) => {
    if(error) 
      {
        return null
      }
    else 
      {
        return decode  
      }
  })

  return decode
}
