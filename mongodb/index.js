const mongoose = require('mongoose')
mongoose.Promise = require('q').Promise

const nicehash = require('./nicehash')
const { debug } = require('../helper/variables')

let db = []
let mongodb = {
  dbOpen: options => {
    // { user: 'admin', pass: 'admin', dbname: 'test' }
    const MONGODB = process.env.MONGODB || '127.0.0.1:27017'
    const login = { user: options.user, pass: options.pass }
    const conn = `mongodb://${MONGODB}/${options.dbname}${options.user ? '?authMode=scram-sha1?authSource=admin' : ''}`
    if (debug) console.log(`[MongoDB] Connecting... 'mongodb://${MONGODB}/${options.dbname}'`)
    return mongoose.connect(conn, login)
  },
  tests: mongoose.model('db-tests', mongoose.Schema({ any: mongoose.Schema.Types.Mixed }), 'db-tests'),
  dbClose: () => {
    if (debug) console.log(`[MongoDB] Close connection.`)
    return mongoose.connection.close()
  }
}
db = db.concat(nicehash)

for (var i = 0; i < db.length; i++) {
  mongodb[db[i].id] = mongoose.model(db[i].name, db[i].schema, db[i].name)
}

module.exports = mongodb
