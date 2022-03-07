import { Request, Response } from 'express'


export default  {
  login: ((req: Request,res: Response) => {
    res.status(200).json({
      message: {
        user: res.locals.user,
        token: res.locals.token 
      }
    })
    res.locals.user = undefined
    res.locals.token = undefined
    return
  }),
  logout: ((req: Request, res: Response) => {
    res.status(200).json({
      message: 'Logout'
    })
    return
  }),
  register: ((req: Request, res: Response) => {
    res.status(200).json({
      message: 'Register'
    })
    return
  }),
  authenticate: ((req: Request, res: Response) => { res.status(200).json({
      message: {
        user: res.locals.user
      }
    })
    return
  })
}


