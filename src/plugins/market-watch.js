const util = require('util')

module.exports = (client, request) =>
  client.addListener('message', (from, to, message) => {
    if (message.indexOf('!btcusd') !== 0) {
      return
    }

    console.log('getting bitcoin price')

    request({
      url: 'https://apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto=BTC&fiat=USD',
      headers: {
        'X-testing': 'testing'
      }
    }, (error, response, body) => {
      const target = client.nick === to ? from : to
      if (error) {
        console.log(error)
        console.log(response)
        console.log(body)
        client.say(target, 'Sorry, got an error...')
        return
      }
      const info = JSON.parse(body)
      client.say(target,
        util.format('$%s', info.BTCUSD.last))
    })
  })
