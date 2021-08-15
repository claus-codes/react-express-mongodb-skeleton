import React from 'react'
import { Route, Switch } from 'react-router-dom'

import IndexPage from './IndexPage'
import NotFoundPage from './NotFoundPage'
import Navigation from './Navigation'

import RegisterPage from '../user/register/RegisterPage'
import LoginPage from '../user/login/LoginPage'
import LogoutPage from '../user/logout/LogoutPage'

export default function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path={'/'} component={IndexPage}/>
        <Route path={'/user/register'} component={RegisterPage}/>
        <Route path={'/user/login'} component={LoginPage}/>
        <Route path={'/user/logout'} component={LogoutPage}/>
        <Route path="*" component={NotFoundPage}/>
      </Switch>
    </>
  )
}
