const { MongoConnection, MongoSchemaMapping } = require('../db-mongo')

let conn = {
  connected: () => false
}
module.exports = {
  connected: () => conn.connected(),
  open: async () => {
    if (!conn.connected()) {
      if (process.env.DBTOUNO_USER === undefined || !process.env.DBTOUNO_SERVER) throw new Error('No Environment db-touno Setup')
      conn = await MongoConnection('db_touno', process.env.DBTOUNO_USER, process.env.DBTOUNO_SERVER)
      MongoSchemaMapping(conn, require('./app'))
      MongoSchemaMapping(conn, require('./schedule'))
      MongoSchemaMapping(conn, require('./wakatime'))
      MongoSchemaMapping(conn, require('./github'))
    }
    return conn
  }
}
