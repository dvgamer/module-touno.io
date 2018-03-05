const mongoose = require('mongoose')
module.exports = [
  {
    id: 'oAuth',
    name: 'oauth-3rd',
    schema: mongoose.Schema({
      name: String,
      client_id: String,
      refresh_token: String,
      expire: Date,
      state: String,
      scope: Object
    })
  }
]
