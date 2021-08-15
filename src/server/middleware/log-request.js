import { log } from '../../common/log'

const LOG_PARAMS = false

export default function logRequestMiddlware(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
  let debug = ''
  if (LOG_PARAMS && process.env.NODE_ENV !== 'production') {
    debug = buildDebugBody(req)
  }
  const identifier = buildIdentifier(req)
  log(`${req.method} ${req.url} [${ip} - ${req.headers['user-agent']}${identifier}] ${debug}`)
  next()
}

const buildDebugBody = req => !['GET'].includes(req.method) && req.headers['content-type'] === 'application/json'
  ? JSON.stringify(req.body)
  : ''

const buildIdentifier = req => req.user ? ` - ${req.user.id}` : ''
