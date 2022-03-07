import { Request,Response } from "express"
import userRoutes from '../route/user'


module.exports = (app: any) => {

  // routes
  app.use('/api',userRoutes) 

  // not found
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      message: 'Not found'
    })
  })

  return
}
