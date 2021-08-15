import { User } from '../../database'
import { userEnum } from '../../database/model/user'
import { notFoundError, badRequestError } from '../../util/error'

export default async function readUser(req, res, next) {
  let { id } = req.params

  try {
    if (!id && req.user) {
      id = req.user.id
    }

    if (!id) {
      return badRequestError(res)
    }

    const user = await User.findOne({ _id: id })
    if (!user) {
      return notFoundError(res)
    }

    if ([userEnum.status.disabled].indexOf(user.status) !== -1) {
      return notFoundError(res)
    }

    const formattedUser = (req.user && req.user.id === user._id)
      ? user.privateUser()
      : user.publicUser()

    return res.json({
      ok: 1,
      user: formattedUser
    })
  }
  catch (err) {
    next(err)
  }
}
