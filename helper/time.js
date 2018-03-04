const numeral = require('numeral')

module.exports = {
  constructor () {
    this._core = process.hrtime()
  },
  nanoseconds () {
    let hr = process.hrtime(this._core)
    const nanoseconds = (hr[0] * 1e9) + hr[1]
    return `${numeral((nanoseconds / 1e6)).format('0,0')}ms`
  },
  seconds () {
    let hr = process.hrtime(this._core)
    const nanoseconds = (hr[0] * 1e9) + hr[1]
    return `${numeral((nanoseconds / 1e9)).format('0,0.00')}s`
  }
}
