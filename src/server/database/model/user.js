import mongoose from 'mongoose'

import { hashPassword, comparePassword } from '../../util/crypto'

export const userEnum = {
  status: {
    disabled: 0,
    active: 1,
  }
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  name: String,
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: userEnum.status.active,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

userSchema.statics.findByEmail = function(email) {
  return this.findOne({
    email: { $regex: new RegExp('^' + email.toLowerCase(), 'i') }
  })
}

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()

  try {
    const password = await hashPassword(this.password)
    this.password = password
    next()
  }
  catch (err) {
    next(err)
  }
})

userSchema.methods.comparePassword = async function(password) {
  return await comparePassword(password, this.password)
}

userSchema.methods.privateUser = function() {
  const { _id, email, name, createdAt } = this
  return { id: _id, name, email, joined: createdAt.toISOString() }
}

userSchema.methods.publicUser = function() {
  const { _id, name, createdAt } = this
  return { id: _id, name, joined: createdAt.toISOString() }
}

userSchema.methods.sessionUser = function() {
  const { _id, name } = this
  return { id: _id, name }
}

const User = mongoose.model('User', userSchema)
export default User
