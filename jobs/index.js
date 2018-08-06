// const cron = require('cron')

let jobs = []

module.exports = {
  Watch: options => {
    let job = Object.assign(options, {
      onTick: () => {},
      start: true,
      timeZone: 'Asia/Bangkok'
    })
    // if (!(typeof options.name === 'string' && options.onTick instanceof Function)) throw new Error('Require name and job function.')
  }
}
