const mongoose = require('mongoose')
module.exports = [
  {
    id: 'ScheduleNote',
    name: 'db-schedule-note',
    schema: mongoose.Schema({
      title: String,
      desc: String,
      date_from: Date,
      date_to: Date,
      allday: Boolean,
      created: Date,
      notify: Boolean
    })
  },
  {
    id: 'Schedule',
    name: 'db-schedule',
    schema: mongoose.Schema({
      period: String,
      every: String,
      title: String,
      holiday: Boolean,
      notify: Boolean
    })
  }
]
