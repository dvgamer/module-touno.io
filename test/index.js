const consola = require('consola')

const debuger = require('./helper/debuger.js')
const Touno = require('../index.js')

consola.info(`Complie ${Object.keys(Touno).length} objects.`)

consola.withScope('UnitTest')
let UnitTest = async () => {
  consola.info(`./helper/debuger.js Testing... `)
  await debuger()
}

consola.start(`Unit Testing...`)
UnitTest().then(() => {
  consola.success(`UnitTest Completed.`)
}).catch(ex => {
  consola.error(ex)
})
