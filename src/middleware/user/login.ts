import bcrypt from 'bcrypt'

import { Request,Response,NextFunction } from "express"
import { IUser, _IUser } from "../../interface/user"
import { find_by_email } from "../main"
import { generate_token } from '../../module/generate_token'
import User from '../../model/User'

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email,password } = req.body
  const user: IUser = await find_by_email(email)
  
  if(!user) 
    {
      res.status(400).json({
        error: 'Email/Password incorrect'
      })
      return
    }

  const isMatch = await check_password_match(password, user.password)
  
  if(!isMatch) 
    {
      res.status(400).json({
        error: 'Email/Password incorrect'
      })
      return
    }

  const data = generate_token(user)
  
  const filter = { email: user.email }
  const update = { token: data.token, status: true }

  await User.findOneAndUpdate(filter,update)  
 
  res.locals.user = data.user
  res.locals.token = data.token

  next()
}

const check_password_match = async (password: string, userPassword: string) => {
  return await bcrypt.compare(password,userPassword)
}


export default login

