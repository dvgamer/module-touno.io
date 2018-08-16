const request = require('request-promise')
const { OAuth } = require('../db-touno')
// const debuger = require('../helper/debuger')

const API_ENDPOINT = process.env.API_ENDPOINT || `https://touno.io`

module.exports = {
  AccessToken: async auth => {
    let item = await OAuth.findOne({ name: auth })
    if (!item) {
      return { error: 'not oauth type, Please validate auth.', uri: `https://touno.io/auth/${auth}` }
    } else {
      await request(`${API_ENDPOINT}/auth/${auth}/accesstoken`)
      item = await OAuth.findOne({ name: auth })
      return item.token
    }
  }
}
