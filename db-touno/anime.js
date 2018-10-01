const mongoose = require('mongoose')

module.exports = [
  {
    id: 'ListAnime',
    name: 'db-list-anime',
    schema: mongoose.Schema({
      anilist_id: String,
      username: String,
      folder_name: String,
      path: String,
      english: String,
      romaji: String,
      status: String,
      image: String,
      anime: {
        start_date: String,
        season: String,
        media_type: String,
        quality: String,
        resolution: String,
        sound: Array,
        subtitle: Array
      },
      files: Array
    })
  }
]
