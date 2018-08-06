const mongoose = require('mongoose')
mongoose.Promise = require('q').Promise

const debuger = require('../helper/debuger')

let mongodb = {
  MongooseOpen: async options => {
    debuger.scope('MongoDB')
    // { user: 'admin', pass: 'admin', dbname: 'test' }
    options = options || {}
    const MONGODB = process.env.MONGODB || 'db-mongo:27017'
    const login = { user: process.env.MONGODB_USER, pass: process.env.MONGODB_PASS }
    const MONGODBNAME = process.env.MONGODB_NAME
    const dbo = `mongodb://${MONGODB}/${MONGODBNAME}${login.user ? '?authMode=scram-sha1' : ''}`

    if (!login.user || !login.pass) throw new Error('mongodb not authentication.')
    if (!MONGODB) throw new Error('mongodb server not found.')
    if (!MONGODBNAME) throw new Error('mongodb not database default.')

    debuger.log(`Connection is 'mongodb://${login.user}@${MONGODB}/${MONGODBNAME}'.`)
    delete options.user
    delete options.pass
    delete options.dbname
    await mongoose.connect(dbo, options)
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
