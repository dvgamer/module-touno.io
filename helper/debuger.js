const consola = require('consola')
const chalk = require('chalk')
const mongoose = require('mongoose')
const Raven = require('./raven')
const Time = require('./time')
const { isDev } = require('./variables')

const grouSize = 6
const groupPadding = (msg) => {
  return msg.length > grouSize ? msg.substr(0, grouSize) : msg.padEnd(grouSize - msg.length, ' ')
}

const loggerCreate = (logger, scopeName) => {
  let measure = null
  return {
    log (...msg) {
      if (!isDev) return
      let msg2 = [' - ']
      msg2.push(measure ? groupPadding(measure.nanoseconds()) : chalk.gray(groupPadding('debug')))
      if (scopeName) msg2.push(scopeName)
      msg2.push(chalk.cray('»'))
      console.log(...(msg2.concat(msg)))
    },
    start (...msg) {
      measure = new Time()
      logger.start(...msg)
    },
    success (...msg) {
      if (measure) msg.push(`(${measure.total()})`)
      logger.success(...msg)
      measure = null
    },
    info (...msg) {
      logger.info(...msg)
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
        logger.error(error, `(${measure.total()})`)
      }
    }
  }
}

module.exports = Object.assign(loggerCreate(consola), {
  scope (name) {
    return loggerCreate(consola.withScope(name), name)
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
})
