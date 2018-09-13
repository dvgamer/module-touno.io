const { MongoConnection, MongoSchemaMapping } = require('../db-mongo')

let conn = {
  connected: () => false
}
module.exports = {
  connected: () => conn.connected(),
  open: async () => {
    if (!conn.connected()) {
      conn = await MongoConnection('db_crypto', process.env.DBCRYPTO_USER, process.env.DBCRYPTO_SERVER)
      MongoSchemaMapping(conn, require('./crypto-market'))
    }
    return conn
  }
}
