const mongoose = require('mongoose')
mongoose.Promise = require('q').Promise

const nicehash = require('./nicehash')
const wakatime = require('./wakatime')
const dbapp = require('./app')
const { debug } = require('../helper/variables')

let db = []
let mongodb = {
  MongooseOpen: async options => {
    // { user: 'admin', pass: 'admin', dbname: 'test' }
    const MONGODB = process.env.MONGODB || '127.0.0.1:27017'
    const login = { user: options.user, pass: options.pass }
    const dbo = `mongodb://${MONGODB}/${options.dbname}${options.user ? '?authMode=scram-sha1?authSource=admin' : ''}`
    if (debug) console.log(`[MongoDB] ${mongoose.connection.readyState}:Connecting... 'mongodb://${MONGODB}/${options.dbname}'`)
    await mongoose.connect(dbo, login)
  },
  tests: mongoose.model('db-tests', mongoose.Schema({ any: mongoose.Schema.Types.Mixed }), 'db-tests'),
  MongooseClose: async () => {
    await mongoose.connection.close()
    if (debug) console.log(`[MongoDB] Close connection.`)
  }
}

db = db.concat(dbapp)
db = db.concat(nicehash)
db = db.concat(wakatime)

for (var i = 0; i < db.length; i++) {
  mongodb[db[i].id] = mongoose.model(db[i].name, db[i].schema, db[i].name)
}

module.exports = mongodb
