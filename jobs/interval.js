const SetInterval = require('interval-promise')

const Raven = require('../helper/raven')
const { TounoConnectionReady, Touno } = require('../db-touno')

module.exports = opt => Raven.Tracking(async () => {
  await TounoConnectionReady()
  let interval = await Touno.findOne({ group: 'interval', item: opt.id })

  if (!opt.id || !interval) throw new Error('Interval Timming ID not found.')
  opt = Object.assign({ once: false, seconds: 30, options: { stopOnError: true } }, opt)
  if (!opt.once) {
    SetInterval(async (iteration, stop) => {
      console.log('SetInterval')
      // if (false) stop()
    }, interval.data.seconds * 1000, opt.options)
  }
})
