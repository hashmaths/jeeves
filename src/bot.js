
const irc = require('irc')
const getUrls = require('get-urls')
const request = require('request')
const cheerio = require('cheerio')

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

  getUrls(message).map(uri => {
    request({
      uri
    }, (error, response, body) => {
      if (error) {
        return
      }

      const $ = cheerio.load(body)
      const title = $('title').text()

      client.say(to, `>>> ${title}`)
    })
  })
})

client.addListener('error', (message) => {
  console.error(message)
})
