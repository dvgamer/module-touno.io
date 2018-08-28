const Raven = require('raven')
const consola = require('consola')
const { isDev } = require('./variables')

let config = null
let logger = consola.withScope('Raven')
let report = {
  warning (ex) {
    logger.warning(ex)
    Raven.captureMessage(ex instanceof Error ? ex : new Error(ex), {
      level: 'warning' // one of 'info', 'warning', or 'error'
    })
  },
  error (ex) {
    logger.error(ex)
    Raven.captureException(ex instanceof Error ? ex : new Error(ex), config)
  }
}

module.exports = {
  warning: report.warning,
  error: report.error,
  async Tracking (OnAsyncCallback) {
    if (!(OnAsyncCallback instanceof Function)) throw new Error('Tracking not Promise.')
    try { await OnAsyncCallback() } catch (ex) { report.error(ex) }
  },
  async ProcessClosed (OnExitProcess) {
    if (!(OnExitProcess instanceof Function)) throw new Error('OnExitProcess not Promise.')
    try { await OnExitProcess() } catch (ex) { report.error(ex) }
  },
  install (data, tag) {
    config = data
    if (!data) throw new Error('Raven not set configuration.')
    if (!isDev) {
      // RAVEN_CONFIG=https://bf6e4ca97c6f45b29017c7cd0a7626fd@sentry.io/1204359
      if (!process.env.RAVEN_CONFIG) throw new Error('`RAVEN_CONFIG` ')
    }
    if (tag) Raven.setContext({ tags: tag })
    Raven.config(!isDev && process.env.RAVEN_CONFIG).install((err, initialErr) => {
      report.error(err || initialErr)
      process.exit(1)
    })
  }
}
