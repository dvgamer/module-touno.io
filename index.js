const debuger = require('./helper/debuger')
const Time = require('./helper/time')
const Raven = require('./helper/raven')

const ProcessClose = afterCallBack => {
  let abortProcess = async () => {
    await afterCallBack()
    process.exit(0)
  }

  process.on('SIGINT', () => Raven.Tracking(abortProcess))
  process.on('SIGUSR1', () => Raven.Tracking(abortProcess))
  process.on('SIGUSR2', () => Raven.Tracking(abortProcess))
  process.on('uncaughtException', () => Raven.Tracking(abortProcess))
}

module.exports = {
  Time,
  debuger,
  Raven,
  ProcessClose
}
