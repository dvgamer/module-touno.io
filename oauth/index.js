const { OAuth } = require('../db-touno')
const { isDev } = require('../helper/variables')
const debuger = require('../helper/debuger')

const APIENDPOINT = process.env.API_ENDPOINT

module.exports = {
  AccessToken: async auth => {
    let item = await OAuth.findOne({ name: auth })
    if (!item) {
      return { error: 'not oauth type, Please validate auth.', uri: `https://touno.io/auth/${auth}` }
    } else {
      let host = !isDev ? APIENDPOINT : `https://touno.io`
      
      debuger.log(`${host}/auth/${auth}/accesstoken`)

      item = await OAuth.findOne({ name: auth })
      return item.token
    }
  }
}
