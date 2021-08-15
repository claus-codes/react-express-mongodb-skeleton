import { User } from '../../database'
import { unauthorizedError } from '../../util/error'
import { signJsonWebToken } from '../../util/crypto'
import { setUserCookie } from './util'

const failedLoginMessage = 'Invalid credentials'

export default async function loginUser(req, res, next) {
  const { email, password } = req.body

  try {
    const user = await User.findByEmail(email).exec()

    if (!user) {
      return unauthorizedError(res, failedLoginMessage)
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return unauthorizedError(res, failedLoginMessage)
    }

    const sessionUser = user.sessionUser()
    const token = await signJsonWebToken(sessionUser)
    setUserCookie(res, token)

    return res.json({
      ok: 1,
      user: sessionUser,
      token,
    })
  }
  catch (err) {
    next(err)
  }
}
