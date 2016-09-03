const getUrls = require('get-urls')
const request = require('request')
const cheerio = require('cheerio')

module.exports = (client) =>
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
        const title = $('title').text().trim()

        if (title) {
          client.say(to, `>>> ${title}`)
        }
      })
    })
  })
