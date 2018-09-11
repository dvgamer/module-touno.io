const logger = require('mocha-logger')

describe('Folder -- helper', () => {
  it('Functional -- debuger', done => {
    const debuger = require('../../helper/debuger')
    debuger.start('start message.')
    debuger.log(' logmessage.')
    debuger.info('info message.')
    debuger.error(new Error('error Class.'))
    debuger.success('success message.')
  
    const scope = debuger.scope('UnitTest')
    scope.log('log message with scope.')
    scope.start('start message with scope.')
    scope.success('success message with scope.')
    scope.info('info message with scope.')
    scope.error(new Error('error Class.'))

    done()
  })
  it('Functional -- raven', done => {
    const Raven = require('../../helper/raven')
    Raven.warning('test message')
    Raven.error(new Error('Testing Error.'))
    Raven.ProcessClosed(process, async () => {})
    Raven.Tracking(async () => {
      done()
    })
  })
  it('Functional -- time', done => {
    const Time = require('../../helper/time')
    let elapsed = new Time()
    logger.log(elapsed.seconds())
    logger.log(elapsed.nanoseconds())
    logger.log(elapsed.total())
    done()
  })
  it('Functional -- variable', done => {
    const { isDev, isWin, randString } = require('../../helper/variable')
    logger.log(`isDev: ${isDev}`)
    logger.log(`isWin: ${isWin}`)
    done()
  })
})
