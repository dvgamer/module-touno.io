const { MongoConnection, MongoSchemaMapping } = require('../db-mongo')

let conn = {
  connected: () => false
}
module.exports = {
  connected: () => conn.connected(),
  open: async () => {
    if (!conn.connected()) {
      if (process.env.DBCRYPTO_USER === undefined || !process.env.DBCRYPTO_SERVER) throw new Error('No Environment db-crypto Setup')
      conn = await MongoConnection('db_crypto', process.env.DBCRYPTO_USER, process.env.DBCRYPTO_SERVER)
      MongoSchemaMapping(conn, require('./nicehash'))
    }
    return conn
  }
}
