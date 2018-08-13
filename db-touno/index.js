const mongoose = require('mongoose')
mongoose.Promise = require('q').Promise

const debuger = require('../helper/debuger')

let mongodb = {
  MongooseOpen: async options => {
    debuger.scope('MongoDB')
    // { user: 'admin', pass: 'admin', dbname: 'test' }
    const TOUNODB_URI = process.env.TOUNODB_URI

    if (!TOUNODB_URI) {
      debuger.error(new Error('mongodb not mongodb uri default.'))
      return
    }

    debuger.log(`Connection is '${TOUNODB_URI}'.`)
    await mongoose.connect(TOUNODB_URI, options)
    debuger.log(`Connected. (State is ${mongoose.connection.readyState})`)
  },
  tests: mongoose.model('db-tests', mongoose.Schema({ any: mongoose.Schema.Types.Mixed }), 'db-tests'),
  MongooseClose: async () => {
    await mongoose.connection.close()
    debuger.scope('MongoDB')
    debuger.log(`Closed. (State is ${mongoose.connection.readyState})`)
  }
}

let db = []
db = db.concat(require('./app'))
db = db.concat(require('./nicehash'))
db = db.concat(require('./wakatime'))
db = db.concat(require('./github'))
db = db.concat(require('./schedule'))
db = db.concat(require('./exhentai'))

for (var i = 0; i < db.length; i++) {
  mongodb[db[i].id] = mongoose.model(db[i].name, db[i].schema, db[i].name)
}

module.exports = mongodb
