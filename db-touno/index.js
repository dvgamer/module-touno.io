const { MongoConnection, MongoSchemaMapping } = require('../db-mongo')

let conn = {
  connected: () => false
}
module.exports = {
  connected: () => conn.connected(),
  open: async () => {
    if (!conn.connected()) {
      conn = await MongoConnection('db_touno', process.env.DBTOUNO_USER, process.env.DBTOUNO_SERVER)
      MongoSchemaMapping(conn, require('./anime'))
      MongoSchemaMapping(conn, require('./app'))
      MongoSchemaMapping(conn, require('./donate'))
      MongoSchemaMapping(conn, require('./expanse'))
      MongoSchemaMapping(conn, require('./github'))
      MongoSchemaMapping(conn, require('./schedule'))
      MongoSchemaMapping(conn, require('./wakatime'))
    }
    return conn
  }
}
