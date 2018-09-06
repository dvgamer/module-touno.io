const mongoose = require('mongoose')
const moment = require('moment-timezone')

mongoose.Promise = require('q').Promise
moment.tz.setDefault(process.env.TZ || 'Asia/Bangkok')

const debuger = require('../helper/debuger').scope('MongoDB')
// let mongoConnected = false
let mongodb = {
  MongoConnection: async (dbname, account, server) => {
    const MONGODB_ACCOUNT = account || process.env.MONGODB_ACCOUNT
    const MONGODB_SERVER = server || process.env.MONGODB_SERVER
    let MONGODB_URI = `mongodb://${MONGODB_ACCOUNT}@${MONGODB_SERVER}/${dbname}?authMode=scram-sha1`
    let conn = await mongoose.createConnection(MONGODB_URI, {})
    debuger.log(`Created. (State is ${conn.readyState})`)

    let db = {}

    return Object.assign({
      connected: () => conn.readyState === 1,
      close: async () => {
        await conn.close()
        // mongoConnected = false
        debuger.log(`Closed. (State is ${conn.readyState})`)
      }
    }, db)
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
