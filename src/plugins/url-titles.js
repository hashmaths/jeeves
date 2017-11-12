const getUrls = require('get-urls')
const cheerio = require('cheerio')

module.exports = (client, request) =>
  client.addListener('message', (from, to, message) => {
    getUrls(message).map(uri => {
      request({
        uri
      }, (error, response, body) => {
        if (error) {
          return
        }

        const $ = cheerio.load(body)
        const title = $('title').text()
                      .replace(/\s+/g, ' ')
                      .trim()
        const target = client.nick === to ? from : to

        if (title) {
          client.say(target, `>>> ${title}`)
        }
      })
    })
  })
