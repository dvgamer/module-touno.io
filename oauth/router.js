const db = require('../db-touno')
const { isDev, randString } = require('../helper/variable')
const Time = require('../helper/time')
const debuger = require('../helper/debuger')

const express = require('express')
const moment = require('moment')
const router = express.Router()

let host = !isDev ? `https://${process.env.DOMAIN_NAME}` : `http://localhost:8080`

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
    const logger = debuger.scope(grant.auth)

    await db.open()
    let item = await db.OAuth.findOne({ name: grant.auth })
    if (!item || !item.token) {
      logger.error(`authorization error -- Please validate auth`)
      res.statusCode(500)
      return
    }
    let elapsed = new Time()
    let accessToken = oauth2.accessToken.create(item.token)

    // Check if the token is expired. If expired it is refreshed.
    if (!accessToken.expired()) {
      res.end()
      return
    }
    logger.log(`authorization step-4 -- refreshing Token`)

    try {
      accessToken = await accessToken.refresh({
        refresh_token: item.token.refresh_token,
        client_id: client.id,
        client_secret: client.secret
      })
      await db.OAuth.update({ _id: item._id }, { $set: { token: accessToken.token, updated: moment().toDate() } })
      logger.log(`authorization step-5 -- refreshToken (${elapsed.nanoseconds()})`)
      logger.audit(`Authorization ${grant.auth} refresh token completed.`, 'success')
      res.end()
    } catch (ex) {
      logger.error(`authorization error -- refreshing token`)
      logger.error(ex)
      res.statusCode(500)
    }
  })

  router.get(`/${grant.name}`, async (req, res) => {
    let { query, baseUrl } = req
    const logger = debuger.scope(grant.auth)

    const uri = `${host}${baseUrl}/${grant.name}`
    const state = `${client.state ? `${client.state}_` : 'api-'}${randString(8)}`
    const authorizationUri = oauth2.authorizationCode.authorizeURL({
      redirect_uri: uri,
      scope: client.scope,
      state: state
    })

    if (!query.code) {
      logger.log(`authorization step-0 -- redirect '${uri}'`)
      res.redirect(authorizationUri)
    } else {
      let elapsed = new Time()
      logger.log(`authorization step-1 -- authorized ${query.code}`)
      logger.log(query)

      try {
        const result = await oauth2.authorizationCode.getToken({
          code: query.code,
          client_id: client.id,
          client_secret: client.secret,
          state: query.state,
          redirect_uri: uri
        })

        await db.open()
        let item = await db.OAuth.findOne({ name: grant.auth })

        let commited = {
          name: grant.auth,
          client: `${client.id}|${client.secret}`,
          updated: moment().toDate(),
          state: state,
          token: result
        }

        if (!item) {
          await new db.OAuth(commited).save()
        } else {
          await db.OAuth.update({ _id: item._id }, { $set: commited })
        }
        logger.audit(`Authorization ${grant.auth} access token completed.`, 'success')
        logger.log(`authorization step-3 -- accessToken ${!item ? 'created' : 'updated'} (${elapsed.nanoseconds()})`)
      } catch (ex) {
        logger.log(`authorization step-error -- getToken fail`)
        logger.error(ex)
      }

      res.redirect(`${host}/`)
    }
  })
  return router
}
