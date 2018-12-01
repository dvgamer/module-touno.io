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
      title: {
        type: String,
        index: true
      },
      subtitle: String,
      image: String,
      quote: String,
      detail: String,
      color: String,
      datetime: Date,
      created: {
        type: Date,
        index: true
      }
    })
  },
  {
    id: 'OAuth',
    name: 'oauth-3rd',
    schema: mongoose.Schema({
      name: String,
      client: String,
      state: String,
      token: Object,
      updated: {
        type: Date,
        index: true
      },
      created: {
        type: Date,
        index: true
      }
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
      created: {
        type: Date,
        index: true
      },
      enabled: {
        type: Boolean,
        index: true
      }
    })
  },
  {
    id: 'AuthSession',
    name: 'db-auth-session',
    schema: mongoose.Schema({
      username: String,
      token: String,
      hash: String,
      online: Boolean,
      created: {
        type: Date,
        index: true
      }
    })
  },
  {
    id: 'Notify',
    name: 'log-notify',
    schema: mongoose.Schema({
      endpoint: {
        type: String,
        index: true
      },
      message: mongoose.Schema.Types.Mixed,
      notify: {
        type: Boolean,
        index: true
      },
      schedule: {
        type: Date,
        index: true
      },
      created: {
        type: Date,
        index: true
      }
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
      created: {
        type: Date,
        index: true
      }
    })
  },
  {
    id: 'Audit',
    name: 'log-audit',
    schema: mongoose.Schema({
      type: {
        type: String,
        index: true
      },
      scope: {
        type: String,
        index: true
      },
      message: String,
      tag: Array,
      created: {
        type: Date,
        index: true
      }
    })
  }
]
