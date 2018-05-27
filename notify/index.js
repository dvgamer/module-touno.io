const api = require('@line/bot-sdk')
const request = require('request-promise')

const apiMinerLine = process.env.LINE_MINER_API
const apiTounoLine = process.env.LINE_TOUNO_API
const apiDevopsLine = process.env.LINE_DEVOPS_API
const apiLineID = process.env.LINE_ID

const nameTouno = `https://hooks.slack.com/services/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`
const nameException = `https://hooks.slack.com/services/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`
const nameNotify = `https://hooks.slack.com/services/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`
const nameGithub = `https://hooks.slack.com/services/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`
const nameWakatime = `https://hooks.slack.com/services/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`
const nameExHentai = `https://hooks.slack.com/services/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`
const client = (token, msg) => {
  const cb = new api.Client({ channelAccessToken: token })
  return cb.pushMessage(apiLineID, msg)
}

const webhook = (uri, name, message, channel) => {
  let payload = {
    text: message,
    username: name,
    channel: channel
  }
  if (typeof message === 'object') {
    payload = message
    payload.channel = channel
    payload.username = name
  }

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
    DevOps: msg => client(apiDevopsLine, typeof msg === 'string' ? { type: 'text', text: msg } : msg),
    Touno: msg => client(apiTounoLine, typeof msg === 'string' ? { type: 'text', text: msg } : msg),
    Miner: msg => client(apiMinerLine, typeof msg === 'string' ? { type: 'text', text: msg } : msg)
  },
  Slack: {
    Notify: (msg, channel, name) => webhook(nameNotify, name, msg, channel),
    Exception: (msg, channel, name) => webhook(nameException, name, msg, channel),
    Touno: (msg, channel, name) => webhook(nameTouno, name, msg, channel),
    Github: (msg, channel, name) => webhook(nameGithub, name, msg, channel),
    Waka: (msg, channel, name) => webhook(nameWakatime, name, msg, channel),
    ExHentai: (msg, channel, name) => webhook(nameExHentai, name, msg, channel)
  }
}
