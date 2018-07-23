const consola = require('consola')
const { isDev } = require('./variables')
const Youch = require('youch')
const forTerminal = require('youch-terminal')
const chalk = require('chalk')

let scopeName = null; 
let logger = consola
module.exports = {
  scope (name) {
    scopeName = name
    logger = name ? consola.withScope(scopeName) : logger = consola
  },
  log (...msg) {
    if (!isDev) return
    console.log(chalk.gray('- debug'),`${scopeName ? `${scopeName} ${chalk.blue('»')}` : ''}`,...msg)
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
      let output = await new Youch(error, {}).toJSON()
      logger.error(error.message)
      console.log(forTerminal(output))
    }
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
