import setting from './config/setting'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import userRoutes from './route/user'
import { createServer } from 'http'

// const
const app = express()
const httpServer = createServer(app)
const corsOption = {
  origin: true,
  credentials: true
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOption))
app.use(cookieParser())

// middleware
require('./config/middleware')(app)
// cors
require('./config/cors')(app)
//  io
require('./config/io')(httpServer)
// routes
require('./config/route')(app)
// initialize

mongoose
  .connect(`${setting.DATABASE.URL}`, setting.DATABASE.OPTIONS)
  .then(() => console.log('Database conneccted'))
  .catch((error) => console.log(`error, ${error}`))
httpServer.listen(setting.SERVER.PORT, () => {
  console.log(`Server: ${setting.SERVER.PORT}`)
})
