import jwt from 'jsonwebtoken'
import setting from '../config/setting'
import { Request,Response,NextFunction } from "express"
import { _IUser } from '../interface/user'
import User from '../model/User'


const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  // testing
  const { token } = req.body
  // deployment
  // const token = req.headers.token
  const user: any | null = await check_token(token)

  if(!user)
    {
      res.status(401).json({
        error: 'Invalid auth'
      })
      return
    }

  const filter = { email: user.email }
  const update = { status: true }
  await User.findOneAndUpdate(filter,update)
  
  res.locals.user = user 
  next()

}


const check_token = async (token: string) => {
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

export default authenticate
