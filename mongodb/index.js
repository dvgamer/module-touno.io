const mongoose = require('mongoose')
mongoose.Promise = require('q').Promise
const nicehash = require('./nicehash')
let db = []
let mongodb = {
  dbOpen: (options) => {
    const MONGODB = process.env.MONGODB || '127.0.0.1:27017'
    const conn = `mongodb://${MONGODB}/${options.dbname}${options.username ? '?authMode=scram-sha1?authSource=admin' : ''}`
    delete options.dbname
    return mongoose.connect(conn, options)
  },
  tests: mongoose.model('db-tests', mongoose.Schema({ any: mongoose.Schema.Types.Mixed }), 'db-tests'),
  dbClose: () => {
    return mongoose.connection.close()
  }
}
db = db.concat(nicehash)

for (var i = 0; i < db.length; i++) {
  mongodb[db[i].id] = mongoose.model(db[i].name, db[i].schema, db[i].name)
}

module.exports = mongodb
