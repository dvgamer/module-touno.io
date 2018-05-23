// const cron = require('cron')

// let jobs = []

module.exports = {
  jobWatch: options => {
    if (!(typeof options.name === 'string' && options.onTick instanceof Function)) throw new Error('Require name and job function.')
  }
}
