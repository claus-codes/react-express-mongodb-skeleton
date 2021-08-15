
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { del } from '../../../util/api'
import useUser from '../../../hooks/useUser'

export default function LogoutPage() {
  const { clearUser } = useUser()
  const history = useHistory()

  useEffect(() => {
    async function logout() {
      await del('/api/user/session')
      clearUser()
      history.push('/')
    }
    logout()
  }, [])

  return (
    <div className="page user-logout">
      <h1>Logging out</h1>
      <p>Please wait to be redirected...</p>
    </div>
  )
}
