const api = require('@line/bot-sdk')
const request = require('request-promise')

const tokenMiner = process.env.LINE_MINER_API
const tokenTouno = process.env.LINE_TOUNO_API
const tokenDevOps = process.env.LINE_DEVOPS_API
const msgID = process.env.LINE_ID

const nameTouno = `https://hooks.slack.com/services/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`
const nameException = `https://hooks.slack.com/services/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`
const nameNotify = `https://hooks.slack.com/services/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`
const client = (token, msg) => {
  const cb = new api.Client({ channelAccessToken: token })
  return cb.pushMessage(msgID, msg)
}

const webhook = (uri, name, message, channel) => {
  let payload = {
    text: message,
    username: name,
    channel: channel,
    icon_url: undefined
  }
  delete payload.icon_url
  if (!channel) delete payload.channel
  if (!name) delete payload.name
  return request({
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: uri,
    formData: { payload: JSON.stringify(payload) }
  })
}

module.exports = {
  LINE: {
    DevOps: msg => client(tokenDevOps, typeof msg === 'string' ? { type: 'text', text: msg } : msg),
    Touno: msg => client(tokenTouno, typeof msg === 'string' ? { type: 'text', text: msg } : msg),
    Miner: msg => client(tokenMiner, typeof msg === 'string' ? { type: 'text', text: msg } : msg)
  },
  Slack: {
    Notify: (msg, channel, name) => webhook(nameNotify, name, msg, channel),
    Exception: (msg, channel, name) => webhook(nameException, name, msg, channel),
    Touno: (msg, channel, name) => webhook(nameTouno, name, msg, channel)
  }
}
