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
    hasNext: () => reminders.length,
    peek: () => reminders[0],
    next: () => reminders.shift()
  }
}

const reminderTool = (client) => {
  let timeout
  const store = inMemoryReminderStore()

  const sendReminder = () => {
    const reminder = store.next()
    const forWho = reminder.target === 'me' ? 'you' : reminder.target
    client.say(
      reminder.channel,
      `${reminder.requester}: ${reminder.moment.fromNow()}, you asked me to remind ${forWho} to ${reminder.task}`)
    pokeReminder()
  }

  const pokeReminder = () => {
    clearTimeout(timeout)
    if (!store.hasNext()) return
    const peekTime = store.peek().moment
    timeout = setTimeout(sendReminder, Math.max(0, peekTime.diff(moment())))
  }

  return (reminder) => {
    store.insert(reminder)
    pokeReminder()
  }
}

module.exports = client => {
  const reminders = reminderTool(client)

  client.addListener('message', (from, to, message) => {
    const target = client.nick === to ? from : to

    try {
      const result = parser.parse(message)
      result.channel = target
      result.requester = from

      const forWho = result.target === 'me' ? 'you' : result.target
      client.say(target, `${from}: On ${result.channel}, I'll remind ${forWho} to ${result.task} ${result.moment.fromNow()}`)

      reminders(result)
    } catch (e) {
      console.log('failed', e)
    }
  })
}
