const { OAuth } = require('../db-touno')
const client = require('./clients')

const moment = require('moment')
const request = require('request-promise')

module.exports = {
  Token: async auth => {
    let item = await OAuth.findOne({ name: auth })
    if (!item) throw new Error('not oauth type, please validate auth.')

    let expire = item.scope.expires_in || item.scope.expires || 0
    if (!item.refresh_token || (!item.scope.expires_in && !item.scope.expires) || moment(item.expire).add(expire, 'second') > moment()) {
      return item
    } else {
      console.log(`[${item.name}] Step 0 -- Refresh Token ${item.refresh_token}`)
      let data = await request({
        method: 'POST',
        uri: client[auth].token,
        json: true,
        form: {
          client_id: client[auth].id,
          client_secret: client[auth].secret,
          grant_type: 'refresh_token',
          refresh_token: item.refresh_token
        }
      })

      item.scope = {
        access_token: data.access_token,
        token_type: data.token_type,
        expires: data.expires
      }
      console.log(`[${item.name}] Step 1 -- Updated ${item.access_token}`)
      await OAuth.update({ _id: item._id }, {
        $set: {
          refresh_token: item.refresh_token,
          expire: moment().toDate(),
          scope: item.scope
        }
      })
      return item
    }
  }
}
