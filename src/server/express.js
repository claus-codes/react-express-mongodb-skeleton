import path from 'path'

import express from 'express'
import { Server } from 'http'

import compression from 'compression'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import helmet from 'helmet'

import forceHttps from './middleware/force-https'
import authentication from './middleware/authentication'
import logRequest from './middleware/log-request'

// TODO: move somewhere?
express.application.prefix = express.Router.prefix = function(path, configure) {
  var router = express.Router()
  this.use(path, router)
  configure(router)
  return router
}

const app = new express()
const server = new Server(app)
const production = process.env.NODE_ENV === 'production'

production && app.use(helmet())

app.use(compression())
app.use(bodyParser.json())
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}))
app.use(cookieParser())

app.use(forceHttps)
app.use(authentication)
app.use(logRequest)

app.set('view engine', 'ejs')
app.set('views', path.resolve('src', 'views'))

app.use(express.static(path.resolve('public'), { maxAge: '1h' }))
app.use('/build', express.static(path.resolve('public', 'build'), { maxAge: '1d' }))

export default { app, server }
