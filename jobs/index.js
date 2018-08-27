const cron = require('cron')
const { debuger } = require('touno.io')
const parser = require('cron-parser')

let core = []

module.exports = {
  corntab: opt => {
    debuger.scope('CronJob')
    let tick = null
    let corn = {
      ID: 'ID_INDENNITY',
      SetStart: true,
      IsStoped: true,
      OnJob: null
    }

    if (opt.tick instanceof Promise) {
      tick = () => {
        if (corn.IsStoped) {
          corn.IsStoped = false
          opt.tick().then(() => {
            corn.IsStoped = true
          }).catch(ex => {
            corn.IsStoped = true
            debuger.scope('CronJob')
            debuger.error(ex)
          })
        }
      }
    } else if (opt.tick instanceof Function) {
      tick = () => {
        if (corn.IsStoped) {
          corn.IsStoped = false
          try {
            opt.tick()
          } catch (ex) {
            debuger.error(ex)
          }
          corn.IsStoped = true
        }
      }
    } else {
      throw new Error('corntab not tick function or promise.')
    }
    if (opt.init) tick()
    let cronTime = parser.parseExpression(opt.time)
    debuger.start(`Job ID: '${corn.ID}' is next at ${cronTime.next().toString()}`)
    corn.OnJob = new cron.CronJob({
      cronTime: opt.time,
      onTick: tick,
      start: corn.SetStart,
      timeZone: 'Asia/Bangkok'
    })
    core.push(corn)
  }
}
