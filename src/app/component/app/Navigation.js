
import React from 'react'
import { Link } from 'react-router-dom'

import useUser from '../../hooks/useUser'

export default function Navigation() {
  const { user } = useUser()
  return (
    <div className="navigation menu menu-horizontal menu-fixed">
      <div className="menu-content">
        <ul className="menu-list">
          <li className="menu-item"><Link to="/" className="menu-link">Home</Link></li>
        </ul>
        <ul className="menu-list float-right">
          {user && <li className="menu-item"><Link to={'/user/logout'} className="menu-link">Logout</Link></li>}
          {!user && <li className="menu-item"><Link to={'/user/login'} className="menu-link">Login</Link></li>}
          {!user && <li className="menu-item"><Link to={'/user/register'} className="menu-link">Register</Link></li>}
        </ul>
      </div>
    </div>
  )
}
