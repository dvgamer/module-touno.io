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
    id: 'TounoTimeline',
    name: 'app-touno-timeline',
    schema: mongoose.Schema({
      title: String,
      subtitle: String,
      image: String,
      quote: String,
      detail: String,
      color: String,
      created: Date
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
    id: 'AuthAccount',
    name: 'db-auth-account',
    schema: mongoose.Schema({
      username: {
        type: String,
        index: true,
        unique: true
      },
      email: {
        type: String,
        index: true,
        unique: true
      },
      password: String,
      permission: String,
      created: Date,
      enabled: Boolean
    })
  },
  {
    id: 'AuthSession',
    name: 'db-auth-session',
    schema: mongoose.Schema({
      username: String,
      token: String,
      hash: String,
      created: Date,
      online: Boolean
    })
  },
  {
    id: 'Notification',
    name: 'db-notification',
    schema: mongoose.Schema({
      endpoint: String,
      message: mongoose.Schema.Types.Mixed,
      notify: Boolean,
      schedule: Date,
      created: Date
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
