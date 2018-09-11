const mongoose = require('mongoose')
const moment = require('moment-timezone')

mongoose.Promise = require('q').Promise
moment.tz.setDefault(process.env.TZ || 'Asia/Bangkok')

const debuger = require('../helper/debuger').scope('MongoDB')
let mongodb = {
  MongoConnection: async (dbname, account, server) => {
    const MONGODB_ACCOUNT = account || process.env.MONGODB_ACCOUNT
    const MONGODB_SERVER = server || process.env.MONGODB_SERVER || 'localhost:27017'
    let MONGODB_URI = `mongodb://${MONGODB_ACCOUNT ? `${MONGODB_ACCOUNT}@` : ''}${MONGODB_SERVER}/${dbname}?authMode=scram-sha1`
    let conn = await mongoose.createConnection(MONGODB_URI, { useNewUrlParser: true, connectTimeoutMS: 10000 })
    debuger.log(`Connected. mongodb://${MONGODB_SERVER}/${dbname} (State is ${conn.readyState})`)
    return Object.assign(conn, {
      connected: () => conn.readyState === 1,
      close: async () => {
        await conn.close()
        debuger.log(`Closed. mongodb://${MONGODB_SERVER}/${dbname} (State is ${conn.readyState})`)
      }
    })
  },
  MongoSchemaMapping: (conn, db) => {
    for (let i = 0; i < db.length; i++) {
      if (conn[db[i].id]) throw new Error(`MongoDB schema name is duplicate '${db[i].id}'`)
      conn[db[i].id] = conn.model(db[i].name, db[i].schema, db[i].name)
    }
  }
}

module.exports = mongodb
