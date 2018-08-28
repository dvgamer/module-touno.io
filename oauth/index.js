const request = require('request-promise')
const mongoose = require('mongoose')
const { OAuth } = require('../db-touno')

const API_ENDPOINT = process.env.API_ENDPOINT || `https://touno.io`

module.exports = {
  AccessToken: async sender => {
    if (mongoose.connection.readyState !== 1) throw new Error('MongoDB ConnectionOpen() is not used.')
    let item = await OAuth.findOne({ name: sender.name })
    if (!item) {
      return { error: 'not oauth type, Please validate auth.', uri: `https://touno.io/auth/${sender.auth}` }
    } else {
      await request(`${API_ENDPOINT}/auth/${sender.auth}/accesstoken`)
      item = await OAuth.findOne({ name: sender.name })
      return item.token
    }
  }
}
