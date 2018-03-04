const mongoose = require('mongoose')
mongoose.Promise = require('q').Promise
const nicehash = require('./nicehash')
let db = []
let mongodb = {
  open: (options) => {
    const MONGODB = process.env.MONGODB || '127.0.0.1:27017'
    return mongoose.connect(`mongodb://${MONGODB}/${options.dbname}${options.auth ? '?authMode=scram-sha1?authSource=admin' : ''}`, options)
  },
  tests: mongoose.model('db-tests', mongoose.Schema({ any: mongoose.Schema.Types.Mixed }), 'db-tests'),
  close: () => {
    return mongoose.connection.close()
  }
}
db = db.concat(nicehash)

for (var i = 0; i < db.length; i++) {
  mongodb[db[i].id] = mongoose.model(db[i].name, db[i].schema, db[i].name)
}

module.exports = mongodb
