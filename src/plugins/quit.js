module.exports = (client, rng) =>
  client.addListener('message', (from, to, message) => {
    if (message.indexOf('!quit') === 0) {
      let quitMessage

      if (message.indexOf(' ') > -1) {
        quitMessage = message.substring(message.indexOf(' ') + 1)
      }

      client.disconnect(quitMessage || 'Goodbye.')
    }
  })
