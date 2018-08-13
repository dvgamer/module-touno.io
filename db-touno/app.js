const mongoose = require('mongoose')
module.exports = [
  {
    id: 'Touno',
    name: 'app-touno.io',
    schema: mongoose.Schema({
      group: String,
      item: String,
      data: mongoose.Schema.Types.Mixed
    })
  },
  {
    id: 'OAuth',
    name: 'oauth-3rd',
    schema: mongoose.Schema({
      name: String,
      client: String,
      updated: Date,
      state: String,
      token: Object
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
  },
  {
    id: 'Audit',
    name: 'log-audit',
    schema: mongoose.Schema({
      created: Date,
      message: String,
      timeline: String,
      active: String,
      badge: String,
      tag: Array
    })
  }
]
