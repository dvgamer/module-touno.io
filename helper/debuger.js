const consola = require('consola')
const { isDev } = require('./variables')
const chalk = require('chalk')

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
    if (!isDev) return
    logger.start(msg.join(' '))
  },
  success (...msg) {
    if (!isDev) return
    logger.success(msg.join(' '))
  },
  info (...msg) {
    if (!isDev) return
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
  audit (message, timeline, badge, tag) {
    const { Audit } = require('../db-touno')
    let log = new Audit({
      created: new Date(),
      message: message,
      timeline: timeline || null,
      badge: badge || null,
      tag: tag || []
    })
    log.save(() => {
      if (!isDev) return
      let log = consola.withScope('Audit')
      log.info(`Server log '${message}' saved.`)
    })
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
