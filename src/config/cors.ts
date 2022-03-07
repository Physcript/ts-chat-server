import { NextFunction, Request, Response } from "express"


module.exports = (app: any) => {
  
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,DELETE,OPTIONS,UPDATE,POST')
    res.setHeader('Access-Control-Allow-headers', 'X-Requested-With,Content-Type,token')
    res.setHeader('Access-Control-Allow-credentials','true')
    next()
  })
  return
}
