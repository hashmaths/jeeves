
// const fs = require('fs')

// if <migration> not in select migration from migrations;
// execute queries in file

// for each file in ./sql/<migration>.sql
// const migrations = fs.readdirSync('./migrations/')

// inject postgres [const postgres = require('../data/postgres')]
module.exports = (db) => {
  db.connect()
  return {
    latest: function () {
    // migrations
    },
    addMigration: function () {

    }
  }
}
