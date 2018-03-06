const mongoose = require('mongoose')
module.exports = [
  {
    id: 'WakaSummaries',
    name: 'db-wakatime',
    schema: mongoose.Schema({
      name: String,
      date: Date,
      total_text: String,
      total_seconds: Number,
      type: String
    })
  },
  {
    id: 'WakaHeartbeat',
    name: 'db-waka_heartbeat',
    schema: mongoose.Schema({
      entity: String,
      id: String,
      time: Number,
      type: String
    })
  }
]
