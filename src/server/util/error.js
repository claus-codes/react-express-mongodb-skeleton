import path from 'path'

const ROOT_PATH = path.resolve('.')

const errorMessages = {
  badRequest: 'Bad request',
  conflict: 'Conflict',
  notFound: 'Not found',
  unauthorized: 'Unauthorized',
  unexpectedError: 'Unexpected error',
  validation: 'Validation error',
}

export function formatError(err) {
  const ok = 0
  const error = err.toString()
  if (process.env.NODE_ENV !== 'production') {
    const stack = err.stack
      .split(' at ')
      .map((line, index) => index !== 0 ? `at ${line.trim().replace(ROOT_PATH, '')}` : line.trim())

    return { ok, error, stack }
  }
  else {
    return { ok, error }
  }
}

export function validationError(res, fields) {
  return res.status(200).json({ ok: 0, error: 'Validation failed', fields })
}

export function serverError(res, error) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).json({ ok: 0, error: errorMessages.unexpectedError })
  }
  return res.status(500).json(formatError(error))
}

export function badRequestError(res, message) {
  return res.status(400).json({ ok: 0, error: message || errorMessages.badRequest })
}

export function unauthorizedError(res, message) {
  return res.status(401).json({ ok: 0, error: message || errorMessages.unauthorized })
}

export function notFoundError(res, message) {
  return res.status(404).json({ ok: 0, error: message || errorMessages.notFound })
}

export function conflictError(res, message, fields) {
  return res.status(409).json({ ok: 0, error: message || errorMessages.conflict, fields })
}
