const api = require('@line/bot-sdk')
const request = require('request-promise')

const apiMinerLine = process.env.LINE_MINER_API
const apiTounoLine = process.env.LINE_TOUNO_API
const apiDevopsLine = process.env.LINE_DEVOPS_API
const apiLineID = process.env.LINE_ID

const nameNotify = process.env.SLACK_NOTIFY_API
const nameException = process.env.SLACK_EXCEPTION_API
const nameTouno = process.env.SLACK_TOUNO_API
const nameGithub = process.env.SLACK_GITHUB_API
const nameWakatime = process.env.SLACK_WAKA_API
const nameExHentai = process.env.SLACK_HENTAI_API

const client = (token, msg) => {
  const cb = new api.Client({ channelAccessToken: token })
  return cb.pushMessage(apiLineID, msg)
}

const slackEndPoint = `https://hooks.slack.com/services/`

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
    Notify: (msg, channel, name) => webhook(`${slackEndPoint}${nameNotify}`, name, msg, channel),
    Exception: (msg, channel, name) => webhook(`${slackEndPoint}${nameException}`, name, msg, channel),
    Touno: (msg, channel, name) => webhook(`${slackEndPoint}${nameTouno}`, name, msg, channel),
    Github: (msg, channel, name) => webhook(`${slackEndPoint}${nameGithub}`, name, msg, channel),
    Waka: (msg, channel, name) => webhook(`${slackEndPoint}${nameWakatime}`, name, msg, channel),
    ExHentai: (msg, channel, name) => webhook(`${slackEndPoint}${nameExHentai}`, name, msg, channel)
  }
}
