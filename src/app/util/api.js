import { error } from '../../common/log'

const debounceTimers = {}
const sessionHeaders = {}

const get = (path) => request('GET', path)

const post = (path, body) => request('POST', path, body)

const put = (path, body) => request('PUT', path, body)

const del = (path, body) => request('DELETE', path, body)

async function upload(path, file) {
  const data = new FormData()
  data.append('file', file)
  return await post(path, data)
}

async function request(method, path, body) {
  try {
    const response = await fetch(path, {
      method,
      ...createRequestParams(body)
    })
    return await response.json()
  }
  catch (err) {
    error(`Error in API call: ${method} ${path}`, err)
    return { error: 'Connection error. Please try again.' }
  }
}

function createRequestParams (body) {
  const defaultParams = { credentials: 'same-origin' }
  const isFormData = body instanceof FormData
  const headers = body && isFormData ? {} : { 'Content-Type': 'application/json' }
  return {
    ...defaultParams,
    ...sessionHeaders,
    headers,
    body: isFormData ? body : JSON.stringify(body)
  }
}

function debounce(label, callback, ms = 500) {
  if (process.env.NODE_ENV === 'test') {
    callback()
    return
  }
  if (typeof debounceTimers[label] !== 'undefined') {
    clearTimeout(debounceTimers[label])
  }
  debounceTimers[label] = setTimeout(() => {
    delete debounceTimers[label]
    callback()
  }, ms)
}

function setHeader(header, value) {
  if (!value) {
    delete sessionHeaders[header]
    return
  }
  sessionHeaders[header] = value
}

export {
  get,
  put,
  post,
  del,

  upload,

  debounce,
  setHeader,
}
