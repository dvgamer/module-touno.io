const mongoose = require('mongoose')
module.exports = [
  {
    id: 'Anilist',
    name: 'db-anilist',
    schema: mongoose.Schema({
      id: Number,
      title_romaji: String,
      title_english: String,
      title_japanese: String,
      type: String,
      series_type: String,
      start_date: String,
      end_date: String,
      start_date_fuzzy: Number,
      end_date_fuzzy: Number,
      season: String,
      description: String,
      adult: Boolean,
      image_url_sml: String,
      image_url_med: String,
      image_url_lge: String,
      image_url_banner: String,
      genres: Array,
      synonyms: Array,
      youtube_id: String,
      hashtag: String,
      updated_at: Number,
      total_episodes: Number,
      duration: Number,
      airing_status: String
    })
  }
]
