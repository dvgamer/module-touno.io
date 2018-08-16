const { OAuth } = require('../db-touno')
const debuger = require('../helper/debuger')

const APIENDPOINT = process.env.API_ENDPOINT || `https://touno.io`

module.exports = {
  AccessToken: async auth => {
    let item = await OAuth.findOne({ name: auth })
    if (!item) {
      return { error: 'not oauth type, Please validate auth.', uri: `https://touno.io/auth/${auth}` }
    } else {
      debuger.log(`${APIENDPOINT}/auth/${auth}/accesstoken`)
      return item.token
    }
  }
}
