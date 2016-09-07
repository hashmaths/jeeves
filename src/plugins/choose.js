module.exports = (client, rng) =>
  client.addListener('message', (from, to, message) => {
    console.log(from + ' => ' + to + ': ' + message)

    if (message.indexOf('!c ') !== 0) {
      return
    }

    const choices = message.substring(3)
                           .split(/or/i)
                           .map(s => s.trim())
                           .filter(s => s)

    if (choices.length < 1) {
      return
    }

    const target = client.nick === to ? from : to

    client.say(target, rng.pick(choices))
  })
