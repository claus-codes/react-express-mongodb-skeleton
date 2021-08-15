import setupUserApiRoutes from './user/router'

import { log, error } from '../../common/log'
import { badRequestError, serverError } from '../util/error'

function invalidApiHandler(req, res) {
  log('Invalid API request', req.path)
  return badRequestError(res)
}

function apiExceptionHandler(err, req, res, next) {
  error(err.stack)
  serverError(res, err)
}

export default function setupApiRoutes(app) {
  app.prefix('/api', apiRouter => {
    setupUserApiRoutes(apiRouter)

    apiRouter.use(apiExceptionHandler)

    apiRouter.route('/*')
      .post(invalidApiHandler)
      .get(invalidApiHandler)
      .put(invalidApiHandler)
      .delete(invalidApiHandler)
  })

  return app
}
