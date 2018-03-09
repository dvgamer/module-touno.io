module.exports = {
  'anilist.co': {
    type: 'code',
    id: process.env.ANILIST_ID,
    secret: process.env.ANILIST_SECRET,
    auth: 'https://anilist.co/api/auth/authorize',
    token: 'https://anilist.co/api/auth/access_token'
  },
  'wakatime.com': {
    type: 'code',
    id: process.env.WAKA_ID,
    secret: process.env.WAKA_SECRET,
    scope: 'email,read_stats,write_logged_time,read_logged_time',
    auth: 'https://wakatime.com/oauth/authorize',
    token: 'https://wakatime.com/oauth/token'
  },
  'github.com': {
    type: 'code',
    id: process.env.GITHUB_ID,
    secret: process.env.GITHUB_SECRET,
    scope: 'user public',
    state: 'touno-oaiurx',
    auth: 'https://github.com/login/oauth/authorize',
    token: 'https://github.com/login/oauth/access_token'
  },
  'imgur.com': {
    type: 'code',
    id: process.env.IMGUR_ID,
    secret: process.env.IMGUR_SECRET,
    state: 'touno-manga',
    auth: 'https://api.imgur.com/oauth2/authorize',
    token: 'https://api.imgur.com/oauth2/token'
  },
  'coins': {
    type: 'code',
    id: process.env.COINS_ID,
    secret: process.env.COINS_SECRET,
    scope: 'buyorder+sellorder+history',
    auth: 'https://coins.ph/user/api/authorize',
    token: 'https://coins.ph/user/oauthtoken'
  }
}
