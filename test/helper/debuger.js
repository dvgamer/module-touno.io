const debuger = require('../../helper/debuger.js')
// helper -- debugerr
module.exports = async () => {
  debuger.log('message.')
  debuger.start('message.')
  debuger.success('message.')
  debuger.info('message.')
  await debuger.error(new Error('Class.'))

  debuger.scope('UnitTest')
  debuger.log('message with scope.')
  debuger.start('message with scope.')
  debuger.success('message with scope.')
  debuger.info('message with scope.')
  await debuger.error(new Error('Class.'))
}
