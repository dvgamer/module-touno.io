const mongoose = require('mongoose')
module.exports = [
  {
    id: 'ExHistory',
    name: 'db-exhentai-history',
    schema: mongoose.Schema({
      name: String,
      cover: String,
      link: String,
      page: Number,
      size: String,
      language: String,
      created: Date,
      updated: Date,
      downloaded: Number
    })
  },
  {
    id: 'ExQueue',
    name: 'db-exhentai-queue',
    schema: mongoose.Schema({
      user_id: String,
      name: String,
      link: String,
      page: Number,
      size: String,
      requested: Date,
      status: String
    })
  },
  {
    id: 'ExUser',
    name: 'db-exhentai-user',
    schema: mongoose.Schema({
      user_id: String,
      nickname: String,
      username: String,
      expire: Date,
      online: Boolean
    })
  }
]
