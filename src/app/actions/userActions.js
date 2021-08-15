import { createAction } from 'redux-actions'

const userActions = {
  setUser: createAction('SET_USER'),
  clearUser: createAction('CLEAR_USER'),
}

export default userActions
