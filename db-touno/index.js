const mongoose = require('mongoose')
mongoose.Promise = require('q').Promise

const debuger = require('../helper/debuger')
let mongoConnected = false
let mongodb = {
  TounoOpen: async options => {
    debuger.scope('MongoDB')
    const TOUNODB_URI = process.env.TOUNODB_URI

    if (!TOUNODB_URI) throw new Error('mongodb not mongodb uri default.')

    debuger.log(`Connection is '${TOUNODB_URI}'.`)
    await mongoose.connect(TOUNODB_URI, Object.assign({ useNewUrlParser: true }, options || {}))
    mongoConnected = true
    debuger.log(`Connected. (State is ${mongoose.connection.readyState})`)
  },
  TounoConnectionReady: async () => {
    if (mongoose.connection.readyState !== 1 || !mongoConnected) throw new Error('MongoDB ConnectionOpen() is not used.')
    return true
  },
  TounoTest: mongoose.model('dev-tests', mongoose.Schema({ any: mongoose.Schema.Types.Mixed }), 'dev-tests'),
  TounoClose: async () => {
    await mongoose.connection.close()
    mongoConnected = false
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
