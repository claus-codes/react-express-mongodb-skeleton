import mongoose from 'mongoose'

import User from './database/model/user'

import { error } from '../common/log'
import config from './config'

mongoose.connect(config.database.connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: config.database.useUnifiedTopology,
})

mongoose.set('useCreateIndex', true)

const db = mongoose.connection
const waitPromises = []
let connected = false

db.on('error', err => {
  error(err)
  while (waitPromises.length) waitPromises.pop().reject(err)
})

db.once('open', () => {
  connected = true
  while (waitPromises.length) waitPromises.pop().resolve(true)
})

const waitForConnection = () => new Promise((resolve, reject) => {
  if (connected) return resolve(true)
  waitPromises.push({ resolve, reject })
})

const generateId = () => mongoose.Types.ObjectId()

const disconnect = () => mongoose.disconnect()

export {
  disconnect,
  waitForConnection,
  generateId,

  User,
}
