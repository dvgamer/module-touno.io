const { MongoConnection } = require('../db-mongo')

const logger = require('../helper/debuger/logger')('TounoDB')

module.exports = {
  TounoOpen: async () => {
    let conn = await MongoConnection('db_touno', process.env.TOUNODB_USR, process.env.TOUNODB_SRV)
    let db = []
    db = db.concat(require('./app'))
    db = db.concat(require('./wakatime'))
    db = db.concat(require('./github'))
    db = db.concat(require('./schedule'))
    db = db.concat(require('./exhentai'))

    for (var i = 0; i < db.length; i++) {
      conn[db[i].id] = conn.model(db[i].name, db[i].schema, db[i].name)
    }
    logger.log(`Mapping ${db.length} collection schema.`)
    return conn
  }
}
