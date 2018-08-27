const cron = require('cron')

let jobs = []

module.exports = {
  corntab: options => {
    let corn = Object.assign(options, {
      onTick: () => {},
      start: true,
      timeZone: 'Asia/Bangkok'
    })
    jobs.push({
      id: 'ID_INDENNITY',
      corntab: new cron.CronJob(corn)
    })
  }
}
