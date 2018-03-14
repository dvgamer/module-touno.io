const mongoose = require('mongoose')

module.exports = [
  {
    id: 'Schedule',
    name: 'db-schedule',
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
    id: 'ScheduleYearly',
    name: 'db-schedule-yearly',
    schema: mongoose.Schema({
      day: Number,
      month: Number,
      title: String,
      holiday: Boolean,
      notify: Boolean
    })
  }
]
