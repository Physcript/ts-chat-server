import validator from 'validator'
import bcrypt from 'bcrypt'

import { Request, Response, NextFunction } from 'express'
import { find_by_email, find_by_name } from '../main'
import { IUserError } from '../../interface/user'
import { generate_uid } from '../../module/generate_uid'
import { generate_avatar } from '../../module/generate_avatar'

import User from '../../model/User'


const register = async (req: Request, res: Response, next: NextFunction) => {
  
  const { name,email,password,confirmPassword } = req.body 
  const error: IUserError = check_empty_string(req)
  const validate_email = await check_email(email)
  const validate_password = check_password(password,confirmPassword)
  
  if(Object.keys(error).length >= 1 )
    {
      res.status(400).json({
        error
      })
      return
    }
  if(await find_by_name(name))
    {
      res.status(400).json({
        error: {
          name: 'Name already exists'
        }
      })
      return
    }
  if(Object.keys(validate_email).length >= 1)
    {
      res.status(400).json({
        error: {
          email: validate_email
        } 
      })
      return
    }
  if(Object.keys(validate_password).length >= 1)
    {
      res.status(400).json({
        error:{
          password: validate_password
        }
      })
      return
    }

  const uid = generate_uid
  const avatar = generate_avatar
  const encrypt = await encrypt_password(password)
  

  const user = new User({
    name,
    password: encrypt,
    email,
    uid,
    avatar,
  })
  

  await user.save()
  

  // 
  // DONE chk error from check_empty_string
  // DONE chk error for duplicate name
  // DONE chck error from duplicate and invalid email
  // DONE chck passwrd no space min 6 then match for confirm password
  //
  // DONE generate uid
  // DONE generate avatar from user randomly
  // DONE finally encrypt password
  // FINALIZE SAVE DB THEN RETURN 

  next()
}


const check_empty_string = ( req: Request ) => {
  const { name,email,password,confirmPassword } = req.body
  const error: any = {}

  const data = {
    Name: name,
    Email: email,
    Password: password,
    ConfirmPassword: confirmPassword
  }

  Object.entries(data).forEach(([key,value]) => {
    if(value.trim() === '') 
      {
        error[key] = `${key} required`
      }
  })

  return error

}

const check_email = async (email: string) => {
  const error: any =  {}
  const user = await find_by_email(email)
  if(user) 
  {
    return error['email'] = 'Email already exist'
  }
  if(!validator.isEmail(email))
  {
    return error['email'] = 'Enter valid email'
  }

  return error
}

const check_password = (password: string, confirmPassword: string) => {
  const error: any = {}

    if(password !== confirmPassword) 
    {
      error['password'] = 'Passowrd not match'
    }
  
    if(password.includes(' '))
    {
      error['password'] = 'Invalid password'
    }

  if(password.length <= 5) 
    {
      error['password'] = 'Password is too short'
    }

  return error 

}

const encrypt_password = async (password: string) => {
  const encrypt = await bcrypt.hash(password,8)
  return encrypt
}

export default register
