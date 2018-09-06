const chalk = require('chalk')
const mongoose = require('mongoose')
const timezone = require('moment-timezone')
const moment = require('moment')
const Raven = require('./raven')
const Time = require('./time')
const { isDev, isWin } = require('./variables')

timezone.tz.setDefault(process.env.TZ || 'Asia/Bangkok')

const groupSize = 6
const scopeSize = 8
const groupPadding = (msg, size, pad) => {
  return msg.length > size ? msg.substr(0, size) : msg[pad](size, ' ')
}

const logWindows = (scope, icon, title, color, msg) => {
  let msg2 = [ color(` ${icon}`) ]
  msg2.push(color(groupPadding(title, groupSize, 'padStart')))
  if (scope) {
    msg2.push(groupPadding(scope, scopeSize, 'padEnd'))
    msg2.push(chalk.cyan('»'))
  }
  console.log(...(msg2.concat(msg)))
}

const logLinux = (scope, msg) => {
  let msg2 = [ moment().format('YYYY-MM-DD HH:mm:ss') ]
  if (scope) msg2.push(`[${scope.toUpperCase()}]`)
  console.log(...(msg2.concat(msg)))
}

const loggerCreate = scopeName => {
  let measure = null
  return {
    log (...msg) {
      if (!isDev) return
      let msg2 = [ chalk.gray.bold(' …') ]
      msg2.push(measure ? groupPadding(measure.nanoseconds(), groupSize, 'padStart') : chalk.gray.bold(groupPadding('debug', groupSize, 'padStart')))
      if (scopeName) {
        msg2.push(groupPadding(scopeName, scopeSize, 'padEnd'))
        msg2.push(chalk.cyan('»'))
      }
      console.log(...(msg2.concat(msg)))
    },
    start (...msg) {
      measure = new Time()
      if (isWin) logWindows(scopeName, moment().format('HH:mm:ss.SSS'), 'start', chalk.cyan.bold, msg); else logLinux(scopeName, msg)
    },
    success (...msg) {
      if (measure) msg.push(`(${measure.total()})`)
      if (isWin) logWindows(scopeName, moment().format('HH:mm:ss.SSS'), 'success', chalk.green.bold, msg); else logLinux(scopeName, msg)
      measure = null
    },
    info (...msg) {
      if (isWin) logWindows(scopeName, moment().format('HH:mm:ss.SSS'), 'info', chalk.blue.bold, msg); else logLinux(scopeName, msg)
    },
    error (ex) {
      if (!ex) return
      if (ex instanceof Error) {
        if (isDev) {
          const Youch = require('youch')
          new Youch(ex, {}).toJSON().then((output) => {
            console.log(require('youch-terminal')(output))
          })
        } else {
          if (!isWin) {
            let excep = /at.*?\((.*?)\)/i.exec(ex.stack) || []
            logLinux(scopeName, [ ex.message.replace('Error:', 'Error Message:') ])
            logLinux(scopeName, [ `Error File: ${excep[1] ? excep[1] : 'N/A'}`, ex.message ])
          }
          Raven.error(ex)
        }
      } else {
        let msg = [ ex.toString() ]
        if (measure) msg.push(`(${measure.total()})`)
        if (isWin) logWindows(scopeName, moment().format('HH:mm:ss.SSS'), 'error', chalk.red.bold, msg); else logLinux(scopeName, msg)
      }
    }
  }
}

module.exports = Object.assign(loggerCreate(), {
  scope (name) {
    return loggerCreate(name)
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
    let logger = loggerCreate('Audit')
    logger.info(`Server audit log`, message.length, `characters saved. (${measure.nanoseconds()})`)
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
    let con = loggerCreate('Notify')
    con.info(`Server notify message`, message.length, `characters saved. (${measure.nanoseconds()})`)
  })
})
