const { MongoConnection, MongoSchemaMapping } = require('../db-mongo')

let conn = {
  connected: () => false
}
module.exports = {
  connected: () => false,
  open: async () => {
    if (!conn.connected()) {
      conn = await MongoConnection('db_touno', process.env.TOUNODB_USR, process.env.TOUNODB_SRV)
      MongoSchemaMapping(conn, require('./app'))
      MongoSchemaMapping(conn, require('./schedule'))
      MongoSchemaMapping(conn, require('./wakatime'))
      MongoSchemaMapping(conn, require('./github'))
    }
    return conn
  }
}
