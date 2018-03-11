const Raven = require('raven')
const { debug } = require('./variables')

Raven.config(!debug && process.env.RAVEN_CONFIG).install((err, initialErr, eventId) => {
  console.error(err)
  process.exit(1)
})
module.exports = ex => {
  Raven.captureException(ex)
}
