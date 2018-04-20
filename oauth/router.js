const { OAuth, MongooseOpen, MongooseClose } = require('../mongodb')
const { debug } = require('../helper/variables')
const Time = require('../helper/time')
const Raven = require('../helper/raven')
const client = require('./clients')

const express = require('express')
const moment = require('moment')
const request = require('request-promise')
const qs = require('querystring')
const router = express.Router()

let host = !debug ? `https://${process.env.VIRTUAL_HOST}` : `http://localhost:8080`

module.exports = grant => {
  router.get(`/${grant.name}`, async (req, res) => {
    let { query, baseUrl } = req

    let data = {
      client_id: client[grant.auth].id,
      client_secret: client[grant.auth].secret,
      grant_type: client[grant.auth].type === 'code' ? 'authorization_code' : '',
      response_type: client[grant.auth].type,
      scope: client[grant.auth].scope,
      state: client[grant.auth].state,
      redirect_uri: `${host}${baseUrl}/${grant.name}`
    }

    if (!data.scope) delete data.scope
    if (!data.state) delete data.state

    if (!query.code) {
      console.log(`[${grant.auth}] OAuth2 Step-0 -- Redirect`)
      res.redirect(`${client[grant.auth].auth}?${qs.stringify(data)}`)
    } else {
      let elapsed = new Time()
      data.code = query.code
      delete data.response_type

      console.log(`[${grant.auth}] OAuth2 Step-1 -- Authorized ${query.code}`)
      let token = await request({ method: 'POST', uri: client[grant.auth].token, form: data, json: true })

      console.log(`[${grant.auth}] OAuth2 Step-2 -- Token verify`)

      await MongooseOpen({ user: 'admin', pass: 'ar00t-touno', dbname: 'db_touno' })
      console.log(`[${grant.auth}] OAuth2 Step-3 -- Database Connected.`)

      let item = await OAuth.findOne({ name: grant.auth })
      let commited = {
        name: grant.auth,
        client_id: `${data.client_id}|${data.client_secret}`,
        refresh_token: token.refresh_token,
        expire: moment(),
        state: client[grant.auth].state || null,
        scope: token
      }

      if (!item) {
        await new OAuth(commited).save()
      } else {
        await OAuth.update({ _id: item._id }, { $set: commited })
      }
      console.log(`[${grant.auth}] OAuth2 Step-4 -- Token ${!item ? 'created' : 'updated'} (${elapsed.nanoseconds()}).`)

      let closeMongo = () => {
        console.log(`[${grant.auth}] OAuth2 Step-5 -- Database Disconnected.`)
      }
      // hooks to execute after response
      res.on('finish', () => MongooseClose().then(closeMongo).catch(Raven))
      res.on('close', () => MongooseClose().then(closeMongo).catch(Raven))

      res.redirect(`${host}/`)
    }
  })
  return router
}
