import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import userActions from '../actions/userActions'

export default function useUser() {
  const dispatch = useDispatch()
  
  const user = useSelector(state => state.user)
  const setUser = useCallback(user => dispatch(userActions.setUser(user)), [dispatch])
  const clearUser = useCallback(() => dispatch(userActions.clearUser()), [dispatch])

  return {
    user,
    setUser,
    clearUser,
  }
}
