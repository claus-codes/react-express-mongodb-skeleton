import { post } from '../../../util/api'
import { validateEmail as validateEmailBasic } from '../../common/validation'

export function validateEmail(email, instance) {
  const basicValidation = validateEmailBasic(email)
  if (basicValidation) return basicValidation

  return instance.debounce(async () => {
    const response = await post('/api/user/validate-email', { email })
    if (response.error) {
      return response.error
    }

    return false
  }, 500)
}

export function validateName(name) {
  if (!name) {
    return 'A name is required'
  }

  return false
}

export function validatePassword(password) {
  if (!password) {
    return 'A password is required'
  }

  if (password.length < 5) {
    return 'Password must be 5 characters or more'
  }

  return false
}
