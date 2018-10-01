const { MongoConnection, MongoSchemaMapping } = require('../db-mongo')

let conn = {
  connected: () => false
}
module.exports = {
  connected: () => conn.connected(),
  open: async () => {
    if (!conn.connected()) {
      conn = await MongoConnection('db_opensource', process.env.DBOPENSOURCE_USER, process.env.DBOPENSOURCE_SERVER)
      MongoSchemaMapping(conn, require('./exhentai'))
      MongoSchemaMapping(conn, require('./pokedex'))
      MongoSchemaMapping(conn, require('./anilist'))
    }
    return conn
  }
}
