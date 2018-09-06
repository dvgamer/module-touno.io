const Raven = require('../helper/raven')
const { TounoConnectionReady, Touno } = require('../db-touno')

module.exports = opt => Raven.Tracking(async () => {
  await TounoConnectionReady()
  let interval = await Touno.findOne({ group: 'interval', item: opt.id })
  opt = Object.assign({ once: false, second: interval.data.second, interval: 0 }, opt)

  if (!opt.id || !interval) throw new Error('Interval Timming ID not found.')
  let iLoop = 0
  let rawIntervel = 0
  const OnTickerEvent = async () => {
    iLoop++
    if (!opt.once) await Raven.Tracking(opt.tick.bind(null, iLoop), true)
    await OnSetTimeoutEvent()
  }
  const OnSetTimeoutEvent = () => {
    clearTimeout(rawIntervel)
    if (opt.interval <= iLoop || !opt.interval) rawIntervel = setTimeout(() => OnTickerEvent(), opt.second * 1000)
  }

  if (opt.once) OnTickerEvent(); else OnSetTimeoutEvent()
})
