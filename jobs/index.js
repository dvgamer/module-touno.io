const cron = require('cron')
const parser = require('cron-parser')

const debuger = require('../helper/debuger')
const Raven = require('../helper/raven')
// const { TounoConnectionReady, Touno } = require('../db-touno')

let core = []

module.exports = {
  CornTab: Raven.Tracking(async opt => {
    // await TounoConnectionReady()
    // let Schedule = await Touno.findOne({ config: 'aaaa', group: 'config', 'data.ID': '' })
    let TickEvent = null
    let corn = {
      ID: opt.id || 'UNKNOW_INDENNITY',
      SetStart: true,
      IsStoped: true,
      OnJob: null
    }

    if (opt.tick instanceof Function) {
      TickEvent = () => {
        if (corn.IsStoped) {
          debuger.scope('CronJob')
          debuger.start(`Job ID: '${corn.ID}' started.`)
          corn.IsStoped = false
          opt.tick().then(() => {
            corn.IsStoped = true
            debuger.scope('CronJob')
            debuger.success(`Job ID: '${corn.ID}' successful.`)
          }).catch(ex => {
            corn.IsStoped = true
            debuger.scope('CronJob')
            debuger.error(`Job ID: '${corn.ID}' error.`)
            debuger.error(ex)
          })
        }
      }
    } else {
      throw new Error('corntab not tick function or promise.')
    }
    if (opt.init) TickEvent()
    let cronTime = parser.parseExpression(opt.time)
    debuger.scope('CronJob')
    debuger.info(`Job ID: '${corn.ID}' is next at ${cronTime.next().toString()}`)
    corn.OnJob = new cron.CronJob({
      cronTime: opt.time,
      onTick: TickEvent,
      start: corn.SetStart,
      timeZone: 'Asia/Bangkok'
    })
    core.push(corn)
  })
}
