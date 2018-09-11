const logger = require('mocha-logger')

describe('Folder -- oauth', () => {
  it('Functional -- AccessToken', done => {
    const { AccessToken } = require('../../oauth')
    AccessToken({ auth: 'waka', name: 'wakatime.com'}).then(() => {
      done()
    }).catch(ex => {
      logger.log(ex)
      done()
    })
  })
  it('Objects -- client', done => {
    const client = require('../../oauth/clients.js')
    done()
  })
})
