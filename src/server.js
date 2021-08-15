import express from './server/express'
import setupRoutes from './server/routes'
import config from './server/config'
import pkg from '../package.json'

import { waitForConnection, disconnect } from './server/database'
import { log, error } from './common/log'

const port = process.env.PORT || config.serverPort
const env = process.env.NODE_ENV || 'dev'
const envSuffix = env !== 'production' ? `-${env}` : ''

const { app, server } = express

setupRoutes(app)

process.on('unhandledRejection', err => error('UnhandledRejection', err))
process.on('exit', shutdownGracefully)
process.on('SIGINT', shutdownGracefully)
process.on('SIGUSR2', shutdownGracefully)

log(`${pkg.name} server v${pkg.version}${envSuffix} starting...`)

waitForConnection()
  .then(() => {
    server.listen(port, () => {
      log(`${pkg.name} v${pkg.version}${envSuffix} listening on port ${port}`)
    })
  })
  .catch(err => {
    error('DB connection failed', err)
  })

function shutdownGracefully() {
  shutdown()
    .then(() => process.exit())
    .catch(err => {
      error('FATAL', err)
      process.exit(1)
    })
}

async function shutdown() {
  log('Shutting down...')
  await disconnect()
}
