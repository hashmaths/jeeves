/* global describe it */

'use strict'

const chai = require('chai')
const expect = chai.expect

const uuidv4 = require('uuid/v4')

describe('postgres', () => {
  it('should be able to connect to the db and access the table', (done) => {
    const db = require('../../../src/data/postgres.js')
    const expectedString = uuidv4()
    db.connect()
    db.initTables()
    db.addMigration(expectedString)
    db.latestMigration((migration) => {
      console.log('test: %o', migration)
      expect(migration).to.equal(expectedString)
      done()
    })
  })
})
