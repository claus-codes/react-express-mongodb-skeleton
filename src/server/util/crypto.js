import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import config from '../config'
const { publicKey, privateKey, signOptions, saltWorkFactor } = config.crypto

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltWorkFactor)
  return await bcrypt.hash(password, salt)
}

export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash)
}

export function signJsonWebToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, signOptions, (err, token) => {
      if (err) return reject(err)
      resolve(token)
    })
  })
}

export function verifyJsonWebToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, publicKey, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })
}
