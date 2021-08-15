import { validateEmail as validateEmailBasic } from '../../common/validation'

export function validateEmail(email, instance) {
  return validateEmailBasic(email)
}

export function validatePassword(password) {
  if (!password) {
    return 'A password is required'
  }

  return false
}
