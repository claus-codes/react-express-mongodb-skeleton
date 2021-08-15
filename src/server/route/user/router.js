import create from './create'
import read from './read'

import login from './login'
import logout from './logout'

import validateEmail from './validate-email'

export default function setupUserApiRoutes(router) {
  router.prefix('/user', userRouter => {
    userRouter.route('/').post(create)
    userRouter.route('/:id?').get(read)

    userRouter.route('/session').post(login)
    userRouter.route('/session').delete(logout)

    userRouter.route('/validate-email').post(validateEmail)
  })
}
