const { MongoConnection, MongoSchemaMapping } = require('../db-mongo')

let conn = {
  connected: () => false
}
module.exports = {
  connected: () => conn.connected(),
  open: async () => {
    if (!conn.connected()) {
      conn = await MongoConnection('db_crypto', process.env.CRYPTO_USR, process.env.CRYPTO_SRV)
      MongoSchemaMapping(conn, require('./nicehash'))
    }
    return conn
  }
}
