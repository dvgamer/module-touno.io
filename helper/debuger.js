const consola = require('consola')
const chalk = require('chalk')

let scopeName = null
let logger = consola
module.exports = {
  scope (name) {
    scopeName = name
    logger = name ? consola.withScope(scopeName) : logger = consola
  },
  log (...msg) {
    // if (!isDev) return
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
  async error (error) {
    if (!error) return
    if (error instanceof Error) {
      const Youch = require('youch')
      let output = await new Youch(error, {}).toJSON()
      console.log(require('youch-terminal')(output))
    } else {
      logger.error(error.message)
    }
  },
  async audit (message, timeline, badge, tag) {
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
    con.info(`Server log '${message}' saved.`)
  },
  async LINE (message, schedule = null) {
    const { Notification } = require('../db-touno')
    let log = new Notification({
      endpoint: 'line',
      message: message,
      notify: false,
      schedule: schedule,
      created: new Date()
    })
    await log.save()
    let con = consola.withScope('Notify')
    con.info(`Server notify '${message}' saved.`)
  },
  progress: {
    begin (msg) {

    },
    end (msg) {

    },
    set (min, max) {

    }
  }
}
