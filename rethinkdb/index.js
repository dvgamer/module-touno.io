const rdb = require('rethinkdb')

let connection = {
  host: process.env.RETHINKDB_HOST,
  port: process.env.RETHINKDB_PORT
}

module.exports = {
  r: rdb,
  rdbConnection: () => rdb.connect(connection)
}
