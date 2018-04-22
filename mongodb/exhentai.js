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
      created: Date,
      success: Boolean
    })
  },
  {
    id: 'exUser',
    name: 'db-exhentai-user',
    schema: mongoose.Schema({
      nickname: String,
      username: String,
      last_login: Date,
      online: Boolean
    })
  }
]
