const parser = require('reminder-parser')
const moment = require('moment')

// TODO: replace this with something that persists data between restarts
const inMemoryReminderStore = () => {
  let reminders = []
  const momcmp = (a, b) => (a.moment < b.moment ? -1 : 1)

  return {
    insert: reminder => {
      reminders.push(reminder)
      reminders.sort(momcmp)
    },
    hasNext: () => reminders.length > 0,
    peek: () => reminders[0],
    next: () => reminders.shift()
  }
}

const reminderTool = (client) => {
  let timeout
  const store = inMemoryReminderStore()

  const sendReminder = () => {
    const reminder = store.next()
    const forWho = reminder.target.toLowerCase() === 'me' ? reminder.requester : reminder.target
    const requester = reminder.target.toLowerCase() === 'me' ? 'you' : reminder.requester
    client.say(
      reminder.channel,
      `${forWho}: ${reminder.whenAsked.fromNow()}, ${requester} asked me to remind you to ${reminder.task}`)
    pokeReminder()
  }

  const pokeReminder = () => {
    clearTimeout(timeout)
    if (!store.hasNext()) return
    const peekTime = store.peek().moment
    timeout = setTimeout(sendReminder, Math.max(0, peekTime.diff(moment())))
  }

  return {
    add: (reminder) => {
      store.insert(reminder)
      pokeReminder()
    }
  }
}

module.exports = client => {
  const reminders = reminderTool(client)

  client.addListener('message', (from, to, message) => {
    const target = client.nick === to ? from : to

    try {
      const results = parser.parse(message)
      if (!results.length) return

      // take the last one because it's probably the most greedy and parsed more
      const result = results[results.length - 1]

      result.channel = target
      result.requester = from
      result.whenAsked = moment()

      const forWho = result.target === 'me' ? 'you' : result.target
      client.say(target, `${from}: I'll remind ${forWho} to ${result.task} ${result.moment.fromNow()}`)

      reminders.add(result)
    } catch (e) {
      // just silently ignore errors
    }
  })
}
