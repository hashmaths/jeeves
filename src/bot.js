const irc = require('irc')
const { Client } = require('pg')

console.log(process.env)

const db = new Client()
db.connect()

console.log('Connected to db!')

const client = new irc.Client(process.env.IRC_HOST, process.env.IRC_NICK, {
  debug: true,
  port: parseInt(process.env.IRC_PORT, 10),
  secure: process.env.IRC_SSL === '1',
  selfSigned: true,
  password: process.env.IRC_PASSWORD,
  channels: process.env.IRC_CHANNELS.split(',')
})

client.addListener('message', (from, to, message) => {
  console.log(from + ' => ' + to + ': ' + message)
})

client.addListener('error', (message) => {
  console.error(message)
})

const request = require('request')
require('./plugins/url-titles.js')(client, request)

const Random = require('random-js')
const rng = new Random(Random.engines.mt19937().autoSeed())
require('./plugins/choose.js')(client, rng)

require('./plugins/quit.js')(client)
