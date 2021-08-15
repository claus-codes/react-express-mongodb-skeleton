import { handleActions } from 'redux-actions'

import userActions from '../actions/userActions'

const defaultState = null

export default handleActions({
  [userActions.setUser]: (state, action) => {
    return action.payload
  },
  [userActions.clearUser]: () => {
    return null
  },
}, defaultState)
