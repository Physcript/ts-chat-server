
import Document from 'mongoose'

export interface IUser extends Document {
  name: string,
  email: string,
  password: string,
  uid: string,
  status: boolean,
  avatar: string,
  token: string,
  updatedAt: Date,
  createdAt: Date
}

export interface _IUser extends Document {
  name: string,
  email: string,
  avatar: string,
  uid: string,
  status: boolean,
  updatedAt: Date,
  createdAt: Date, 
}

export interface IUserError extends Document {
  name: string,
  email: string,
  password: string,
  confirmPassword: string
}
