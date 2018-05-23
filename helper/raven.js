const Raven = require('raven')
const debuger = require('./debuger')
const { isDev } = require('./variables')

let config = null
module.exports = {
  set (data) {
    config = Object.assign(config, data)
  },
  warning (ex) {
    Raven.captureMessage(ex instanceof Error ? ex.message : ex, {
      level: 'warning' // one of 'info', 'warning', or 'error'
    })
  },
  error (ex) {
    Raven.captureException(ex instanceof Error ? ex : new Error(ex), config)
  },
  install (data) {
    config = data
    if (!data) throw new Error('Raven not set configuration.')
    if (!isDev) {
      // RAVEN_CONFIG=https://bf6e4ca97c6f45b29017c7cd0a7626fd@sentry.io/1204359
      if (!process.env.RAVEN_CONFIG) throw new Error('`RAVEN_CONFIG` ')
    }
    Raven.config(!isDev && process.env.RAVEN_CONFIG).install((err, initialErr, eventId) => {
      debuger.error(err || initialErr)
      if (isDev) process.exit(1)
    })
  }
}
