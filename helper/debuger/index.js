const loggerCreate = require('./logger')
const mongoose = require('mongoose')
const timezone = require('moment-timezone')
const Raven = require('./../raven')
const Time = require('./../time')

timezone.tz.setDefault(process.env.TZ || 'Asia/Bangkok')

module.exports = Object.assign(loggerCreate(), {
  scope (name) {
    return loggerCreate(name)
  },
  audit: (message, timeline, badge, tag) => Raven.Tracking(async () => {
    let measure = new Time()
    if (mongoose.connection.readyState !== 1) throw new Error('MongoDB ConnectionOpen() is not used.')
    const { Audit } = require('../db-touno')
    let log = new Audit({
      created: new Date(),
      message: message,
      timeline: timeline || null,
      badge: badge || null,
      tag: tag || []
    })
    await log.save()
    let logger = loggerCreate('Audit')
    logger.info(`Server audit log`, message.length, `characters saved. (${measure.nanoseconds()})`)
  }),
  LINE: (message, schedule = null) => Raven.Tracking(async () => {
    let measure = new Time()
    if (mongoose.connection.readyState !== 1) throw new Error('MongoDB ConnectionOpen() is not used.')
    const { Notification } = require('../db-touno')
    let log = new Notification({
      endpoint: 'Touno',
      message: message,
      notify: false,
      schedule: schedule,
      created: new Date()
    })
    await log.save()
    let con = loggerCreate('Notify')
    con.info(`Server notify message`, message.length, `characters saved. (${measure.nanoseconds()})`)
  })
})
