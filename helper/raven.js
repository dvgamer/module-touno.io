const Raven = require('raven')
const { debug } = require('./variables')

if (process.env.RAVEN_CONFIG) {
  Raven.config(process.env.RAVEN_CONFIG).install((err, initialErr, eventId) => {
    console.error(err)
    process.exit(1)
  })
}

module.exports = ex => {
  if (!debug && process.env.RAVEN_CONFIG) {
    Raven.captureException(ex)
  } else {
    console.log(`${ex.message}`)
  }
}
