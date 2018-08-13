const consola = require('consola')
const { isDev } = require('./variables')
const chalk = require('chalk')
const { Audit } = require('./db-touno')

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
    if (!isDev || !error) return
    if (error instanceof Error) {
      const Youch = require('youch')
      let output = await new Youch(error, {}).toJSON()
      logger.error(error.message)
      console.log(require('youch-terminal')(output))
    }
  },
  audit (message, timeline, badge, tag) {
    let me = this
    let log = new Audit({
      created: new Date(),
      message: message,
      timeline: timeline || null,
      badge: badge || null,
      tag: tag || []
    })
    log.save(() => {
      if (!isDev) return
      me.scope('Audit')
      me.log('Log saved', message)
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
