const { OAuth } = require('../db-touno')
const { isDev, randString } = require('../helper/variables')
const Time = require('../helper/time')
const debuger = require('../helper/debuger')

const express = require('express')
const moment = require('moment')
const router = express.Router()

let host = !isDev ? `https://${process.env.VIRTUAL_HOST}` : `http://localhost:8080`

module.exports = grant => {
  const client = require('./clients')[grant.auth]
  const credentials = {
    client: {
      id: client.id,
      secret: client.secret
    },
    auth: {
      tokenHost: client.host,
      tokenPath: client.token,
      authorizePath: client.auth
    }
  }

  const oauth2 = require('simple-oauth2').create(credentials)

  router.get(`/${grant.name}/accesstoken`, async (req, res) => {
    debuger.scope(`[${grant.auth}]`)

    let item = await OAuth.findOne({ name: grant.auth })
    if (!item || !item.token) {
      debuger.log(`authorization step-error -- Please validate auth`)
      res.statusCode(500).end()
      return
    }
    let elapsed = new Time()
    let accessToken = oauth2.accessToken.create(item.token)

    // Check if the token is expired. If expired it is refreshed.
    if (!accessToken.expired()) {
      res.end()
      return
    }

    try {
      accessToken = await accessToken.refresh()
      await OAuth.update({ _id: item._id }, { $set: { token: accessToken, updated: moment().toDate() } })
      debuger.log(`authorization step-4 -- refreshToken (${elapsed.nanoseconds()})`)
      res.end()
    } catch (error) {
      debuger.log(`authorization step-error -- refreshing token ${error.message}`)
      res.statusCode(500).end()
    }
  })

  router.get(`/${grant.name}`, async (req, res) => {
    let { query, baseUrl } = req
    debuger.scope(`[${grant.auth}]`)

    const uri = `${host}${baseUrl}/${grant.name}`
    const state = `${client.state ? `${client.state}_` : 'api-'}${randString(8)}`
    const authorizationUri = oauth2.authorizationCode.authorizeURL({
      redirect_uri: uri,
      scope: client.scope,
      state: state
    })

    if (!query.code) {
      debuger.log(`authorization step-0 -- redirect '${uri}'`)
      res.redirect(authorizationUri)
    } else {
      let elapsed = new Time()
      debuger.log(`authorization step-1 -- authorized ${query.code}`)
      debuger.log(req.url)
      debuger.log(query)

      try {
        const result = await oauth2.authorizationCode.getToken(query)
        debuger.log(result)

        let item = await OAuth.findOne({ name: grant.auth })

        let commited = {
          name: grant.auth,
          client: `${credentials.client.id}|${credentials.client.secret}`,
          updated: moment().toDate(),
          state: state,
          token: result
        }

        if (!item) {
          await new OAuth(commited).save()
        } else {
          await OAuth.update({ _id: item._id }, { $set: commited })
        }
        debuger.log(`authorization step-3 -- accessToken ${!item ? 'created' : 'updated'} (${elapsed.nanoseconds()})`)
      } catch (ex) {
        debuger.log(`authorization step-error -- getToken fail (${ex.message})`)
        debuger.error(ex)
      }

      res.redirect(`${host}/`)
    }
  })
  return router
}
