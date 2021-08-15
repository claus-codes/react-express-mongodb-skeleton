import { User } from '../../database'

import config from '../../config'
import { conflictError } from '../../util/error'

export function setUserCookie(res, value) {
  res.cookie(config.cookie.name, value, { maxAge: config.cookie.maxAge, httpOnly: config.cookie.httpOnly })
}

export function clearUserCookie(res) {
  res.clearCookie(config.cookie.name)
}

export async function checkExistingByEmail(res, email) {
  const existingUser = await User.findByEmail(email).exec()

  if (existingUser) {
    return conflictError(res, 'Email already exists')
  }

  return false
}
