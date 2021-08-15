import { User } from '../database'
import { unauthorizedError } from '../util/error'

export default function requireUserMiddleware(checkDatabase = false) {
  return async function (req, res, next) {
    if (!req.user) {
      return unauthorizedError(res)
    }
    if (checkDatabase) {
      const user = await User.findById(req.user.id)
      if (!user) {
        return next(unauthorizedError(res))
      }
    }
    next()
  }
}
