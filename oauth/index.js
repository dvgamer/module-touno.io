const { oAuth } = require('../mongodb')
// import { slack } from '../.notify'

const moment = require('moment')
const request = require('request-promise')
// const qs = require('querystring')
// const util = require('util')

let host = (process.env.NODE_ENV === 'production') ? `https://${process.env.VIRTUAL_HOST}` : `http://localhost:8080`

const client = {
  'anilist.co': {
    type: 'code',
    id : process.env.ANILIST_ID,
    secret : process.env.ANILIST_SECRET,
    auth: 'https://anilist.co/api/auth/authorize',
    token: 'https://anilist.co/api/auth/access_token'
  },
  'wakatime.com': {
    type: 'code',
    id : process.env.WAKA_ID,
    secret : process.env.WAKA_SECRET,
    scope: 'email,read_stats,write_logged_time,read_logged_time',
    auth: 'https://wakatime.com/oauth/authorize',
    token: 'https://wakatime.com/oauth/token'
  },
  'github.com': {
    type: 'code',
    id : process.env.GITHUB_ID,
    secret : process.env.GITHUB_SECRET,
    scope: 'user public',
    state: 'touno-oaiurx',
    auth: 'https://github.com/login/oauth/authorize',
    token: 'https://github.com/login/oauth/access_token'
  },
  'imgur.com': {
    type: 'code',
    id : process.env.IMGUR_ID,
    secret : process.env.IMGUR_SECRET,
    state: 'touno-manga',
    auth: 'https://api.imgur.com/oauth2/authorize',
    token: 'https://api.imgur.com/oauth2/token'
  },
  'coins': {
    type: 'code',
    id : process.env.COINS_ID,
    secret : process.env.COINS_SECRET,
    scope: 'buyorder+sellorder+history',
    auth: 'https://coins.ph/user/api/authorize',
    token: 'https://coins.ph/user/oauthtoken',
  }
}

// export const oauth = grant => {
//   router.get(`/${grant.name}`, (req, res) => {
//     let query = req.query, uri = req.baseUrl

//     let data = {
//       client_id: client[grant.auth].id,
//       client_secret: client[grant.auth].secret,
//       grant_type: client[grant.auth].type == 'code' ? 'authorization_code' : '',
//       response_type: client[grant.auth].type,
//       scope: client[grant.auth].scope,
//       state: client[grant.auth].state,
//       redirect_uri: `${host}${uri}/${grant.name}`
//     }

//     if (!data.scope) delete data.scope
//     if (!data.state) delete data.state
    
//     if(!query.code) {
//       console.log(`[${grant.auth}] Step 00 -- authorize`)
//       res.redirect(`${client[grant.auth].auth}?${qs.stringify(data)}`)
//     } else {
//       let elapsed = new Time()
//       console.log(`[${grant.auth}] Step 01 -- verify ${query.code}`)
//       data.code = query.code
//       delete data.response_type

//       request({
//         method: 'POST',
//         uri: client[grant.auth].token, 
//         form: data,
//         json: true
//       }).then(token => {
//         console.log(`[${grant.auth}] Step 02 -- get token ${data.client_id}`)
//         return oAuth.findOne({ 
//           name: grant.auth
//         }).then(item => {
//           console.log(`[${grant.auth}] Step 03 -- create token ${data.client_secret}`)
//           let commited = {
//             name: grant.auth,
//             client_id: `${data.client_id}|${data.client_secret}`,
//             refresh_token: token.refresh_token,
//             expire: moment(),
//             state: client[grant.auth].state || null,
//             scope: token
//           }
//           console.log(`[${grant.auth}] Step 04 -- ${!item?'created':'updated'} ${token.access_token}`)
//           slack.notify(`Authorize ${!item?'create':'update'} elapsed is ${elapsed.nanoseconds()} complated.`, '#app-touno', grant.auth)
//           return !item ? new oAuth(commited).save() : oAuth.update({_id:item._id},{$set:commited})
//         })
//       }).then(() => {
//         res.redirect(`${host}/`)
//       }).catch(err => {
//         console.log(`[${grant.auth}] ERROR ${err}`)
//         slack.notify(`Authorize error.`, '#app-touno', grant.auth)
//         res.redirect(data.redirect_uri)
//       })
//     }
//   })
//   return router
// }

module.exports = {
  token: async (auth) => {
    return oAuth.findOne({ 
      name: auth
    }).then(item => {
      if(!item) throw new Error('not oauth type, please validate auth.')
      if(!item.scope.expires_in || moment(item.expire) + (((item.scope.expires_in || 0) - 60) * 1000) > moment()) {
        return item
      } else {
        console.log(`[${item.name}] Step 00 -- refresh_token ${item.refresh_token}`)
        if (!item.refresh_token) throw new Error('not oauth type, please validate auth.')
        return request({
          method: 'POST',
          uri: client[auth].token,
          json: true, 
          form: {
            client_id: client[auth].id,
            client_secret: client[auth].secret,
            grant_type: 'refresh_token',
            refresh_token: item.refresh_token
          }
        }).then(data => {
          return oAuth.update({ _id: item._id }, {
            $set: { 
              refresh_token: item.refresh_token, 
              expire: moment(),
              scope: {
                access_token: data.access_token,
                token_type: data.token_type,
                expires: data.expires
              } 
            } 
          }).then(saved=>{
            item.scope = data
            return item
          })
        })
      }
    })
  }
}