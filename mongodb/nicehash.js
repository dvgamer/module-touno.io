const mongoose = require('mongoose')
module.exports = [
  {
    id: 'Coin',
    name: 'db-nicehash-coin',
    schema: mongoose.Schema({
      time: Number,
      crypto: String,
      satoshi: Number,
      balance: Number,
      second: Number,
      created: Date
    })
  },
  {
    id: 'Wallet',
    name: 'db-nicehash-wallet',
    schema: mongoose.Schema({
      type: String,
      data: mongoose.Schema.Types.Mixed
    })
  },
  {
    id: 'Miner',
    name: 'db-nicehash-miner',
    schema: mongoose.Schema({
      gpu_id: String,
      index: Number,
      name: String,
      compute: String,
      state: String,
      bus_id: String,
      updated: Date
    })
  }
]
