import { NextFunction, Request, Response } from "express"


module.exports = (app: any) => {
  app.use((req: Request, res: Response, next: NextFunction) => {
    
    console.log(`Method: ${req.method} , Url: ${req.url}`)

    next()
  })

  return

}
