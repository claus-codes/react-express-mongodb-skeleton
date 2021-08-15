import { createAppStore } from '../../app/store'
import userActions from '../../app/actions/userActions'

import config from '../config'

export default async (req, res) => {
  const preloadedState = getState(req)

  res.render('app', {
    title: config.projectName,
    preloadedState,
    bundle: {
      js: '/build/app.js',
      css: '/build/app.css',
    },
  })
}

function getState(req) {
  const store = createAppStore()
  if (req.user) {
    store.dispatch(userActions.setUser(req.user))
  }
  return store.getState()
}
