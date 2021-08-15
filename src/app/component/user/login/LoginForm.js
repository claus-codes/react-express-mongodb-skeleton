import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from "react-router-dom"
import { useForm } from 'react-form'

import useUser from '../../../hooks/useUser'
import Notification from '../../common/Notification'
import InputField from '../../form/InputField'
import { validateEmail, validatePassword } from './validation'
import { post } from '../../../util/api'

const defaultValues = {
  email: '',
  password: '',
}

export default function LoginForm() {
  const history = useHistory()
  const { user, setUser } = useUser()
  const [ error, setError ] = useState(null)

  const login = useCallback(async ({ name, email, password}) => {
    const { user, error } = await post('/api/user/session', { name, email, password })
    if (error) {
      setError(error)
      return
    }
    setError(null)
    setUser(user)
  })

  const {
    Form,
    meta: { isSubmitting, canSubmit }
  } = useForm({
    defaultValues,
    onSubmit: login,
  })

  useEffect(() => {
    if (!isSubmitting && user) history.push('/')
  }, [isSubmitting, user])

  return (
    <div className="form form-user-login">
      { error && <Notification message={error} type='error' /> }
      <Form>
        <div className="form-input">
          <label>
            Email:
            <InputField
              field="email"
              type="text"
              validate={validateEmail}
            />
          </label>
        </div>
        <div className="form-input">
          <label>
            Password:
            <InputField
              field="password"
              type="password"
              validate={validatePassword}
            />
          </label>
        </div>
        <div className="form-submit">
          <button className="button-primary" type="submit" disabled={!canSubmit}>
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </Form>
    </div>
  )
}
