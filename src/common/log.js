let isLoggingEnabled = true // todo: read from config

export const timestamp = now => now ? now.toISOString() : new Date().toISOString()

export function enableLogging(enabled) {
  isLoggingEnabled = !!enabled
}

export function log(...args) {
  isLoggingEnabled && console.log(timestamp(), ...args) // eslint-disable-line no-console
}

export function warn(...args) {
  isLoggingEnabled && console.warn(timestamp(), ...args) // eslint-disable-line no-console
}

export function error(...args) {
  isLoggingEnabled && console.error(timestamp(), ...args) // eslint-disable-line no-console
}

export function debug(...args) {
  if (process.env.NODE_ENV !== 'production') {
    isLoggingEnabled && console.log(...args) // eslint-disable-line no-console
  }
}

export function trace(...args) {
  if (process.env.NODE_ENV !== 'production') {
    isLoggingEnabled && console.trace(...args) // eslint-disable-line no-console
  }
}
