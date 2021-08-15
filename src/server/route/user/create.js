import { User } from '../../database'
import { badRequestError } from '../../util/error'
import { signJsonWebToken } from '../../util/crypto'
import { setUserCookie, checkExistingByEmail } from './util'

export default async function createUser(req, res, next) {
  const {
    email,
    name,
    password,
  } = req.body

  if (!email || !name || !password) {
    return badRequestError(res)
  }

  try {
   const conflict = await checkExistingByEmail(res, email)
    if (conflict) {
      return conflict
    }

    const user = new User({
      email,
      name,
      password,
    })
    await user.save()

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
