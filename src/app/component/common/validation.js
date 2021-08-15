export function validateEmail(email) {
  if (!email) {
    return 'An email address is required'
  }
  const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!emailRegexp.test(email)) {
    return 'Email address is invalid'
  }
  return false
}
