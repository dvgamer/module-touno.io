const debuger = require('./helper/debuger')
const Time = require('./helper/time')
const Raven = require('./helper/raven')
const TounoDB = require('./db-touno')
const oAuth = require('./oauth')
const Notify = require('./notify')

const ProcessClose = afterCallBack => {
  let abortProcess = async () => {
    await afterCallBack()
    process.exit(0)
  }

  process.on('SIGINT', () => abortProcess().catch(Raven))
  process.on('SIGUSR1', () => abortProcess().catch(Raven))
  process.on('SIGUSR2', () => abortProcess().catch(Raven))
  process.on('uncaughtException', () => abortProcess().catch(Raven))
}

module.exports = {
  oAuth,
  TounoDB,
  Notify,
  Time,
  debuger,
  Raven,
  ProcessClose
}
