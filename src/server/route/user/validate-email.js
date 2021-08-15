import { User } from '../../database'
import { badRequestError, conflictError } from '../../util/error'

export default async function validateUserEmail(req, res, next) {
  const { email } = req.body

  if (!email) {
    return badRequestError(res)
  }

  try {
    const existingUser = await User.findByEmail(email).exec()
    if (existingUser) {
      return conflictError(res, 'Email already exists')
    }

    return res.json({ ok: 1 })
  }
  catch (err) {
    next(err)
  }
}
