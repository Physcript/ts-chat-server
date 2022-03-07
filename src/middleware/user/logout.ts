import { Request,Response,NextFunction } from "express"
import User from "../../model/User"
import { check_token } from "../main"



const logout = async (req: Request, res: Response, next: NextFunction) => {
  // test
  const { token } = req.body
  //
  const user: any | null = await check_token(token)
  if(!user)
    {
      res.status(401).json({
        error: 'Invalid action'
      })
      return
    }
  
  const filter = { email: user.email }
  const update = { token: '', status: false }

  await User.findOneAndUpdate(filter,update)
  
  next()
   
}

export default logout
