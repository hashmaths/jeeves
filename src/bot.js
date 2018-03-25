// load default irc client and initialize plugins below

const irc = require('irc')

console.log(process.env)

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

// initialize and load plugins below

// migrations
const postgres = require('./data/postgres.js')
const migrations = require('./plugins/migrations.js')(postgres)
migrations.latest()

// url titles
const request = require('request')
require('./plugins/url-titles.js')(client, request)

// random chooser
const Random = require('random-js')
const rng = new Random(Random.engines.mt19937().autoSeed())
require('./plugins/choose.js')(client, rng)

// quitter
require('./plugins/quit.js')(client)
require('./plugins/reminder.js')(client)
