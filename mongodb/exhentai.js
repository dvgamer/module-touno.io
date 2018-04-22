const mongoose = require('mongoose')

module.exports = [
  {
    id: 'exManga',
    name: 'db-exhentai.org',
    schema: mongoose.Schema({
      username: String,
      name: String,
      cover: String,
      link: String,
      page: Number,
      size: String,
      language: String,
      status: String,
      requested: Date,
      created: Date,
      success: Boolean
    })
  },
  {
    id: 'exUser',
    name: 'db-exhentai-user',
    schema: mongoose.Schema({
      guest: String,
      nickname: String,
      username: String,
      expire: Date,
      online: Boolean
    })
  }
]
