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
  },
  addMigration: (migration) => {
    const text = 'INSERT INTO migrations(migration) VALUES($1) RETURNING *'
    const values = [migration]
    db.query(text, values)
      .then(res => {
        console.log('inserted row: %o', res.rows[0])
      })
      .catch(e => console.error(e.stack))
  },
  latestMigration: (callback) => {
    const text = 'SELECT migration, cr_date FROM migrations ORDER BY cr_date DESC LIMIT 1'
    db.query(text)
      .then(res => {
        console.log('selected row: %o', res.rows[0])
        callback(res.rows[0].migration)
      })
      .catch(e => console.error(e.stack))
  }
}
