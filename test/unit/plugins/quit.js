/* global describe it */

'use strict'
const chai = require('chai')
const sinon = require('sinon')
chai.should()
chai.use(require('sinon-chai'))

describe('quit', () => {
  it('should should quit with a default message', () => {
    const client = {
      addListener: (name, callback) => {
        callback('from', 'to', '!quit')
      },
      disconnect: sinon.spy()
    }

    require('../../../src/plugins/quit.js')(client)

    client.disconnect.should.have.been.calledWith('Goodbye.')
  })

  it('should should quit with a custom message', () => {
    const client = {
      addListener: (name, callback) => {
        callback('from', 'to', '!quit see you later!')
      },
      disconnect: sinon.spy()
    }

    require('../../../src/plugins/quit.js')(client)

    client.disconnect.should.have.been.calledWith('see you later!')
  })
})
