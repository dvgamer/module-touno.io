const mongoose = require('mongoose')

module.exports = [
  {
    id: 'DonateHistory',
    name: 'db-donate-history',
    schema: mongoose.Schema({
      userId: {
        type: String,
        index: true
      },
      method: {
        type: String,
        index: true
      },
      date: Date,
      amount: Number,
      fee: Number,
      currency: String,
      rate: Number,
      created: {
        type: Date,
        index: true
      }
    })
  },
  {
    id: 'DonateUser',
    name: 'db-donate-user',
    schema: mongoose.Schema({
      userId: {
        type: String,
        index: true,
        unique: true
      },
      name: String,
      email: {
        type: String,
        index: true,
        unique: true
      },
      created: Date
    })
  }
]
