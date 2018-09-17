const Raven = require('../helper/raven')

module.exports = options => Raven.Tracking(async () => {
  options = Object.assign({ now: false, second: 30, interval: 0 }, options)

  let iLoop = 0
  let rawIntervel = 0
  const OnTickerEvent = async () => {
    iLoop++
    await Raven.Tracking(options.tick.bind(null, iLoop), true)
    await OnSetTimeoutEvent()
  }
  const OnSetTimeoutEvent = () => {
    clearTimeout(rawIntervel)
    if (options.interval <= iLoop || !options.interval) rawIntervel = setTimeout(() => OnTickerEvent(), options.second * 1000)
  }

  if (options.now) OnTickerEvent(); else OnSetTimeoutEvent()
})
