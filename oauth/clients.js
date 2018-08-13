module.exports = {
  'anilist.co': {
    type: 'code',
    id: process.env.ANILIST_ID,
    secret: process.env.ANILIST_SECRET,
    host: 'https://anilist.co',
    auth: '/api/auth/authorize',
    token: '/api/auth/access_token'
  },
  'wakatime.com': {
    type: 'code',
    id: process.env.WAKA_ID,
    secret: process.env.WAKA_SECRET,
    scope: 'email,read_stats,write_logged_time,read_logged_time',
    host: 'https://wakatime.com',
    auth: '/oauth/authorize',
    token: '/oauth/token'
  },
  'github.com': {
    type: 'code',
    id: process.env.GITHUB_ID,
    secret: process.env.GITHUB_SECRET,
    scope: 'user public',
    state: 'touno-oaiurx',
    host: 'https://github.com',
    auth: '/login/oauth/authorize',
    token: '/login/oauth/access_token'
  },
  'imgur.com': {
    type: 'code',
    id: process.env.IMGUR_ID,
    secret: process.env.IMGUR_SECRET,
    state: 'touno-manga',
    host: 'https://api.imgur.com',
    auth: '/oauth2/authorize',
    token: '/oauth2/token'
  },
  'coins': {
    type: 'code',
    id: process.env.COINS_ID,
    secret: process.env.COINS_SECRET,
    scope: 'buyorder+sellorder+history',
    host: 'https://coins.ph',
    auth: '/user/api/authorize',
    token: '/user/oauthtoken'
  }
}
