const irc = require('irc')

const config = require('../config.js')
console.log(config)

const client = new irc.Client(config.host, config.nick, {
  debug: true,
  port: config.port,
  secure: config.ssl,
  selfSigned: true,
  channels: config.channels
})

client.addListener('error', (message) => {
  console.error(message)
})

const request = require('request')
require('./plugins/url-titles.js')(client, request)
