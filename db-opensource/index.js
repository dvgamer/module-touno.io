const { MongoConnection } = require('../db-mongo')

const logger = require('../helper/debuger')('OpensourceDB')

module.exports = {
  OpenSourceOpen: async () => {
    let conn = await MongoConnection('db_opensource', process.env.OPENSOURCE_USR, process.env.OPENSOURCE_SRV)
    let db = []
    db = db.concat(require('./exhentai'))

    for (var i = 0; i < db.length; i++) {
      conn[db[i].id] = conn.model(db[i].name, db[i].schema, db[i].name)
    }
    logger.log(`Mapping ${db.length} collection schema.`)
    return conn
  }
}
