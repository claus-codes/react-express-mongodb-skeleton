import { verifyJsonWebToken } from '../util/crypto'
import config from '../config'
import User from '../database/model/user'
import { unauthorizedError } from '../util/error'

export default async function authenticationMiddleware(req, res, next) {
  const accessToken = req.headers['x-access-token']
  const cookie = req.cookies[config.cookie.name]

  let token
  if (accessToken) {
    token = accessToken
  }
  else if (cookie) {
    token = cookie
  }

  if (!token) return next()

  try {
    req.user = await verifyJsonWebToken(token)
    next()
  }
  catch (err) {
    next(err)
  }
}
