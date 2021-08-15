import { badRequestError } from '../../util/error'
import { clearUserCookie } from './util'

export default async function logoutUser(req, res) {
  if (!req.user) {
    return badRequestError(res)
  }

  clearUserCookie(res)

  return res.json({
    ok: 1,
  })
}
