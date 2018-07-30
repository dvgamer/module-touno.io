const mongoose = require('mongoose')
mongoose.Promise = require('q').Promise

const debuger = require('../helper/debuger')

let db = []
let mongodb = {
  MongooseOpen: async options => {
    debuger.scope('MongoDB')
    // { user: 'admin', pass: 'admin', dbname: 'test' }
    options = options || {}
    const MONGODB = process.env.MONGODB || 'db-mongo:27017'
    const login = { user: options.user || process.env.MONGODB_USER, pass: options.pass || process.env.MONGODB_PASS }
    const MONGODBNAME = options.dbname || process.env.MONGODB_NAME
    const dbo = `mongodb://${MONGODB}/${MONGODBNAME}${login.user ? '?authMode=scram-sha1?authSource=admin' : ''}`

    debuger.log(`Connection is 'mongodb://${login.user}@${MONGODB}/${MONGODBNAME}'.`)
    await mongoose.connect(dbo, login)
    debuger.log(`${mongoose.connection.readyState}: Connected.`)
  },
  tests: mongoose.model('db-tests', mongoose.Schema({ any: mongoose.Schema.Types.Mixed }), 'db-tests'),
  MongooseClose: async () => {
    await mongoose.connection.close()
    debuger.scope('MongoDB')
    debuger.log(`${mongoose.connection.readyState}: Closed.`)
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
