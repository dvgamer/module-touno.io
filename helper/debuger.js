const consola = require('consola')
const chalk = require('chalk')
const mongoose = require('mongoose')
const Raven = require('./variables/raven')
const Time = require('./variables/time')
const { isDev } = require('./variables')

let scopeName = null
let logger = consola
module.exports = {
  scope (name) {
    scopeName = name
    logger = name ? consola.withScope(scopeName) : logger = consola
  },
  log (...msg) {
    if (!isDev) return
    console.log(chalk.gray('- debug'), `${scopeName ? `${scopeName} ${chalk.blue('»')}` : ''}`, ...msg)
  },
  start (...msg) {
    // if (!isDev) return
    logger.start(msg.join(' '))
  },
  success (...msg) {
    // if (!isDev) return
    logger.success(msg.join(' '))
  },
  info (...msg) {
    // if (!isDev) return
    logger.info(msg.join(' '))
  },
  error (error) {
    if (!error) return
    if (error instanceof Error) {
      if (isDev) {
        const Youch = require('youch')
        new Youch(error, {}).toJSON().then((output) => {
          console.log(require('youch-terminal')(output))
        })
      } else {
        Raven.error(error)
      }
    } else {
      logger.error(error.message)
    }
  },
  audit: (message, timeline, badge, tag) => Raven.Tracking(async () => {
    let measure = new Time()
    if (mongoose.connection.readyState !== 1) throw new Error('MongoDB ConnectionOpen() is not used.')
    const { Audit } = require('../db-touno')
    let log = new Audit({
      created: new Date(),
      message: message,
      timeline: timeline || null,
      badge: badge || null,
      tag: tag || []
    })
    await log.save()
    let con = consola.withScope('Audit')
    con.info(`Server audit log '${message.length}' characters saved. (${measure.nanoseconds()})`)
  }),
  LINE: (message, schedule = null) => Raven.Tracking(async () => {
    let measure = new Time()
    if (mongoose.connection.readyState !== 1) throw new Error('MongoDB ConnectionOpen() is not used.')
    const { Notification } = require('../db-touno')
    let log = new Notification({
      endpoint: 'Touno',
      message: message,
      notify: false,
      schedule: schedule,
      created: new Date()
    })
    await log.save()
    let con = consola.withScope('Notify')
    con.info(`Server notify message ${message.length} characters saved. (${measure.nanoseconds()})`)
  })
}
