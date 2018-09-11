const { MongoConnection, MongoSchemaMapping } = require('../db-mongo')

let conn = {
  connected: () => false
}
module.exports = {
  open: async () => {
    if (!conn.connected()) {
      conn = await MongoConnection('db_opensource', process.env.OPENSOURCE_USR, process.env.OPENSOURCE_SRV)
      MongoSchemaMapping(conn, require('./exhentai'))
    }
    return conn
  }
}
