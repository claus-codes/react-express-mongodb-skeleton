import React from 'react'
import { Link } from 'react-router-dom'

import useUser from '../../hooks/useUser'

export default function IndexPage() {
  const { user } = useUser()

  if (!user) {
    return (
      <div className="page page-index">
        <p>Please <Link to={'/user/login'}>login</Link> or  <Link to={'/user/register'}>register</Link> to continue.</p>
      </div>
    )
  }

  return (
    <div className="page page-index">
      <p>Hello {user.name}!</p>
    </div>
  )
}
