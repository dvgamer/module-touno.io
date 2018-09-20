const cron = require('cron')
const moment = require('moment')

const debuger = require('../helper/debuger')
const logger = require('../helper/debuger/logger')('CronJob')
const Raven = require('../helper/raven')
const conn = require('../db-touno')

let core = []
let RefreshCornTab = async (db, frequency) => {
  for (let i = 0; i < core.length; i++) {
    const { ID, OnJob } = core[i]
    let schedule = await db.Touno.findOne({ group: 'corntab', item: ID })
    if (schedule && schedule.data.reload) {
      await db.Touno.updateOne({ _id: schedule._id }, { $set: { 'data.reload': false, 'data.started': false } })
      OnJob.stop()
      OnJob.setTime(new cron.CronTime(schedule.data.time))
      logger.info(`Job ID: '${ID}' Restarted is next at ${moment(OnJob.nextDates()).format('DD MMMM YYYY HH:mm:ss')}`)
      debuger.audit(`${ID} is restart next at ${moment(OnJob.nextDates()).format('DD MMMM YYYY HH:mm:ss')}`, 'success')
      await db.Touno.updateOne({ _id: schedule._id }, { $set: { 'data.started': true } })
      OnJob.start()
    }
  }
  setTimeout(() => RefreshCornTab(db, frequency), frequency)
}

module.exports = opt => Raven.Tracking(async () => {
  let db = await conn.open()
  Raven.ProcessClosed(process, db.close)
  let schedule = await db.Touno.findOne({ group: 'corntab', item: opt.id })

  if (!opt.id || !schedule) throw new Error('CornTab ID not found.')
  schedule.data._id = schedule._id
  let TickEvent = null
  let corn = {
    ID: opt.id,
    IsStoped: true,
    data: schedule.data,
    OnJob: null
  }

  if (opt.tick instanceof Function) {
    TickEvent = OnJob => {
      if (corn.IsStoped) {
        logger.start(`Job ID: '${corn.ID}' started.`)
        corn.IsStoped = false
        opt.tick().then(() => {
          corn.IsStoped = true
          logger.success(`Job ID: '${corn.ID}' successful and next at ${moment(OnJob.nextDates()).format('DD MMMM YYYY HH:mm:ss')}.`)
        }).catch(ex => {
          corn.IsStoped = true
          logger.error(`Job ID: '${corn.ID}' error.`)
          logger.error(ex)
        })
      }
    }
  } else {
    throw new Error('corntab not tick function or promise.')
  }
  corn.OnJob = new cron.CronJob({
    cronTime: corn.data.time,
    onTick: () => TickEvent(corn.OnJob),
    start: true,
    timeZone: 'Asia/Bangkok'
  })
  logger.info(`Job ID: '${corn.ID}' is next at ${moment(corn.OnJob.nextDates()).format('DD MMMM YYYY HH:mm:ss')}`)

  if (corn.data.initial) corn.OnJob.fireOnTick()
  await db.Touno.updateOne({ _id: schedule._id }, { $set: { 'data.started': true, 'data.reload': false } })
  core.push(corn)
  if (core.length === 1) {
    let { data } = await db.Touno.findOne({ group: 'config', item: 'server' })
    await RefreshCornTab(db, data['corntab-watch-frequency'])
  }
})
