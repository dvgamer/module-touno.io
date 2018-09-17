const mongoose = require('mongoose')
module.exports = [
  {
    id: 'PokedexGo',
    name: 'db-pokedex-go',
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
  }
]
