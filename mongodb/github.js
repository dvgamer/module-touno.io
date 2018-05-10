const mongoose = require('mongoose')
module.exports = [
  {
    id: 'GithubStar',
    name: 'db-github',
    schema: mongoose.Schema({
      star_id: String,
      name: String,
      full_name: String,
      html_url: String,
      description: String,
      updated_at: String,
      published_at: String,
      notify: Boolean,
      tag: String,
      release: mongoose.Schema.Types.Mixed
    })
  }
]
