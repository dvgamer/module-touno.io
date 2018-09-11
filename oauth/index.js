const request = require('request-promise')
const db = require('../db-touno')

const API_ENDPOINT = process.env.API_ENDPOINT || `https://touno.io`

module.exports = {
  AccessToken: async sender => {
    if (!db.connected()) throw new Error('MongoDB ConnectionOpen() is not used.')
    let item = await db.OAuth.findOne({ name: sender.name })
    if (!item) {
      return { error: 'not oauth type, Please validate auth.', uri: `${API_ENDPOINT}/auth/${sender.auth}` }
    } else {
      await request(`${API_ENDPOINT}/auth/${sender.auth}/accesstoken`)
      item = await db.OAuth.findOne({ name: sender.name })
      return item.token
    }
  }
}
