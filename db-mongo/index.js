const mongoose = require('mongoose')
const moment = require('moment-timezone')

mongoose.Promise = require('q').Promise
moment.tz.setDefault(process.env.TZ || 'Asia/Bangkok')

const debuger = require('../helper/debuger').scope('MongoDB')
// let mongoConnected = false
let mongodb = {
  MongoConnection: async dbname => {
    const MONGODB_ACCOUNT = process.env.MONGODB_ACCOUNT
    let MONGODB_URI = `mongodb://${MONGODB_ACCOUNT}@aws.compute-southeast-1.touno.io:6501/${dbname}?authMode=scram-sha1`
    let conn = await mongoose.createConnection(MONGODB_URI, {})
    // mongoConnected = true

    return {
      close: async () => {
        await conn.close()
        // mongoConnected = false
        debuger.log(`Closed. (State is ${conn.readyState})`)
      }
    }
  }
}

// let db = []
// db = db.concat(require('./app'))
// db = db.concat(require('./nicehash'))
// db = db.concat(require('./wakatime'))
// db = db.concat(require('./github'))
// db = db.concat(require('./schedule'))
// db = db.concat(require('./exhentai'))

// for (var i = 0; i < db.length; i++) {
//   mongodb[db[i].id] = mongoose.model(db[i].name, db[i].schema, db[i].name)
// }

module.exports = mongodb
