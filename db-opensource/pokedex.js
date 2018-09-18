const mongoose = require('mongoose')
module.exports = [
  {
    id: 'PokemonGo',
    name: 'db-pokemon-go',
    schema: mongoose.Schema({
      filename: String,
      image: String,
      alternate_form: String,
      field_pokemon_type: String,
      field_primary_moves: String,
      field_secondary_moves: String,
      field_legacy_charge_moves: String,
      field_legacy_quick_moves: String,
      exclusive_moves: String,
      field_evolutions: String,
      catch_rate: String,
      field_flee_rate: String,
      quick_exclusive_moves: String,
      number: Number,
      title_1: String,
      name: Array,
      image_mini: String,
      cp_35: String,
      cp_30: String,
      cp_25: String,
      rating: String,
      egg_cp: String,
      min_egg_cp: String,
      candy: String,
      hatch: String,
      buddy: String,
      pokemon_class: String,
      field_pokemon_generation: String,
      def: String,
      atk: String,
      sta: String,
      link: String
    })
  },
  {
    id: 'PokemonGoEvents',
    name: 'db-pokemon-go-event',
    schema: mongoose.Schema({
      event: String,
      title: String,
      description: String,
      url: String,
      type: String,
      image: String,
      share_body: String,
      logo: String,
      start_date: String,
      end_date: String,
      countries: String,
      upvotes_id: String,
      created: Date
    })
  },
  {
    id: 'PokemonGoNews',
    name: 'db-pokemon-go-news',
    schema: mongoose.Schema({
      title: String,
      description: String,
      url: String,
      image: String,
      start_date: Date,
      created: Date
    })
  },
  {
    id: 'BotRotomuMessage',
    name: 'bot-rotomu-message',
    schema: mongoose.Schema({
      from: String,
      to: Array,
      sender: mongoose.Schema.Types.Mixed,
      schedule: Date,
      created: Date,
      sended: Boolean
    })
  },
  {
    id: 'BotRotomuConfig',
    name: 'bot-rotomu-config',
    schema: mongoose.Schema({
      id: String,
      type: String,
      permission: {
        news: Boolean,
        pokedex: Boolean,
        event: Boolean
      },
      created: Date
    })
  }
]
