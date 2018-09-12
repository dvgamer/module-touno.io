const { MongoConnection, MongoSchemaMapping } = require('../db-mongo')

let conn = {
  connected: () => false
}
module.exports = {
  connected: () => conn.connected(),
  open: async () => {
    if (!conn.connected()) {
      if (process.env.DBOPENSOURCE_USER === undefined || !process.env.DBOPENSOURCE_SERVER) throw new Error('No Environment db-opensource Setup')
      conn = await MongoConnection('db_opensource', process.env.DBOPENSOURCE_USER, process.env.DBOPENSOURCE_SERVER)
      MongoSchemaMapping(conn, require('./exhentai'))
    }
    return conn
  }
}
