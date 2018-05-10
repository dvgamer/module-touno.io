const Raven = require('raven')
const debuger = require('./debuger')

Raven.config(!debug && process.env.RAVEN_CONFIG).install((err, initialErr, eventId) => {
  debuger.error(err || initialErr)
  process.exit(1)
})

let config = {}
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
  }
}
