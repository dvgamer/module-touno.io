const mongoose = require('mongoose')
mongoose.Promise = require('q').Promise

const { isDev } = require('../helper/variables')

let db = []
let mongodb = {
  MongooseOpen: async options => {
    // { user: 'admin', pass: 'admin', dbname: 'test' }
    options = options || {}
    const MONGODB = process.env.MONGODB || '127.0.0.1:27017'
    const login = { user: options.user || process.env.MONGODB_USER, pass: options.pass || process.env.MONGODB_PASS }
    const dbo = `mongodb://${MONGODB}/${options.dbname || process.env.MONGODB_NAME}${options.user ? '?authMode=scram-sha1?authSource=admin' : ''}`
    if (isDev) console.log(`[MongoDB] ${mongoose.connection.readyState}:Connecting... 'mongodb://${MONGODB}/${options.dbname}'`)
    await mongoose.connect(dbo, login)
  },
  tests: mongoose.model('db-tests', mongoose.Schema({ any: mongoose.Schema.Types.Mixed }), 'db-tests'),
  MongooseClose: async () => {
    await mongoose.connection.close()
    if (isDev) console.log(`[MongoDB] Close connection.`)
  }
}

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
