import express from 'express'
import controller from '../controller/user'
import register_middleware from '../middleware/user/register'
import login_middleware from '../middleware/user/login'
import logout_middleware from '../middleware/user/logout'
import authenticate_middleware from '../middleware/authenticate' 
import logout from '../middleware/user/logout'
  const router = express.Router()

  router.post('/register',register_middleware,controller.register)
  router.post('/login',login_middleware,controller.login)
  router.post('/auth',authenticate_middleware,controller.authenticate)
  router.post('/logout',logout_middleware,controller.logout)

export default router 
