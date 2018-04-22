const mongoose = require('mongoose')
module.exports = [
  {
    id: 'OAuth',
    name: 'oauth-3rd',
    schema: mongoose.Schema({
      name: String,
      client_id: String,
      refresh_token: String,
      expire: Date,
      state: String,
      scope: Object
    })
  },
  {
    id: 'Account',
    name: 'oauth-account',
    schema: mongoose.Schema({
      username: String,
      token: String,
      active: Boolean
    })
  },
  {
    id: 'LogRequest',
    name: 'log-request',
    schema: mongoose.Schema({
      token: Boolean,
      access: Number,
      ipaddress: String,
      url: String
    })
  }
]
