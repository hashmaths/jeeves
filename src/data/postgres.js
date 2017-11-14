// connect given environemnt variables
const { Client } = require('pg')
const db = new Client()

// define postgress access methods here. doing so lets us unit test
// the dependencies of this class.
module.exports = {
  connect: function () {
    db.connect()
    console.log('Connected to db!')
  },
  initTables: function () {
    db.query(`create table if not exists migrations (
      migration varchar(255) not null,
      cr_date timestamp default now()
      )`)
  }
}
