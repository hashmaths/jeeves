
const irc = require('irc')
const config = require('../config')

console.log(config)

const client = new irc.Client(config.host, config.nick, {
  debug: true,
  port: config.port,
  secure: config.ssl,
  channels: config.channels
})

client.addListener('message', (from, to, message) => {
  console.log(from + ' => ' + to + ': ' + message)
})

client.addListener('error', (message) => {
  console.error(message)
})
