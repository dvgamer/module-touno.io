const mongoose = require('mongoose')
module.exports = [
  {
    id: 'Touno',
    name: 'app-touno.io',
    schema: mongoose.Schema({
      config: String,
      data: mongoose.Schema.Types.Mixed
    })
  },
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
      url: String,
      token: Boolean,
      ipaddress: String,
      requested: Date,
      created: Date
    })
  },
  {
    id: 'Notification',
    name: 'db-notification',
    schema: mongoose.Schema({
      endpoint: String,
      message: String,
      notify: Boolean,
      schedule: Date,
      created: Date
    })
  }
]
