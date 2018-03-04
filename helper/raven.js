const Raven = require('raven')

if (process.env.RAVEN_CONFIG) {
  Raven.config(process.env.RAVEN_CONFIG).install((err, initialErr, eventId) => {
    console.error(err)
    process.exit(1)
  })
}

module.exports = ex => {
  if (process.env.NODE_ENV === 'production' && process.env.RAVEN_CONFIG) {
    Raven.captureException(ex)
  } else {
    console.log(`${ex.message}`)
  }
}
