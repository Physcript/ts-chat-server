import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  name: String,
  uid: String,
  email: {
    type: String,
    lowercase: true
  },
  status: {
    type: Boolean,
    default: false
  },
  password: String,
  avatar: String,
  token: String,
}, { timestamps: true })

const User = mongoose.model('User',userSchema)
export default User
