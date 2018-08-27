const cron = require('cron')
const { debuger } = require('touno.io')
const parser = require('cron-parser')

let core = []

module.exports = {
  corntab: opt => {
    debuger.scope('CronJob')
    let TickEvent = null
    let corn = {
      ID: 'ID_INDENNITY',
      SetStart: true,
      IsStoped: true,
      OnJob: null
    }

    if (opt.tick instanceof Function) {
      TickEvent = () => {
        if (corn.IsStoped) {
          debuger.start(`Job ID: '${corn.ID}' started.`)
          corn.IsStoped = false
          opt.tick().then(() => {
            corn.IsStoped = true
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
    debuger.info(`Job ID: '${corn.ID}' is next at ${cronTime.next().toString()}`)
    corn.OnJob = new cron.CronJob({
      cronTime: opt.time,
      onTick: TickEvent,
      start: corn.SetStart,
      timeZone: 'Asia/Bangkok'
    })
    core.push(corn)
  }
}
