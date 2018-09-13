const mongoose = require('mongoose')

module.exports = [
  {
    id: 'CryptoMarket',
    name: 'db-market',
    schema: mongoose.Schema({
      market: String,
      ask: Number,
      bid: Number,
      created: Date
    })
  }
]
