/* global describe it */

'use strict'
const chai = require('chai')
const sinon = require('sinon')
chai.should()
chai.use(require('sinon-chai'))

describe('choose', () => {
  it('should say nothing if not asked', () => {
    const client = {
      addListener: (name, callback) => {
        callback('from', 'to', 'this message is not asking to choose anything')
      },
      say: sinon.spy()
    }

    const rng = {
      pick: (arr) => {
        throw new Error('should not be called!')
      }
    }

    require('../../../src/plugins/choose.js')(client, rng)

    client.say.should.have.not.been.called
  })

  it('should ignore no choices', () => {
    const client = {
      addListener: (name, callback) => {
        callback('from', 'to', '!c  ')
      },
      say: sinon.spy()
    }

    const rng = {
      pick: (arr) => {
        throw new Error('should not be called!')
      }
    }

    require('../../../src/plugins/choose.js')(client, rng)

    client.say.should.have.not.been.called
  })

  it('should work with one choice', () => {
    const client = {
      addListener: (name, callback) => {
        callback('from', 'to', '!c a')
      },
      say: sinon.spy()
    }

    const rng = {
      pick: (arr) => {
        return arr[0]
      }
    }

    require('../../../src/plugins/choose.js')(client, rng)

    client.say.should.have.been.calledWith('to', 'a')
  })

  it('should work on goofy words', () => {
    const client = {
      addListener: (name, callback) => {
        callback('from', 'me', '!c forgive or forget')
      },
      say: sinon.spy()
    }

    const rng = {
      pick: (arr) => {
        return arr[0]
      }
    }

    require('../../../src/plugins/choose.js')(client, rng)

    client.say.should.have.been.calledWith('me', 'forgive')
  })

  it('should work in pms', () => {
    const client = {
      addListener: (name, callback) => {
        callback('from', 'me', '!c a or b')
      },
      say: sinon.spy(),
      nick: 'me'
    }

    const rng = {
      pick: (arr) => {
        return arr[0]
      }
    }

    require('../../../src/plugins/choose.js')(client, rng)

    client.say.should.have.been.calledWith('from', 'a')
  })

  it('should collapse down the ors', () => {
    const client = {
      addListener: (name, callback) => {
        callback('from', 'to', '!c a Or oR OR or b')
      },
      say: sinon.spy()
    }

    const rng = {
      pick: (arr) => {
        return arr[1]
      }
    }

    require('../../../src/plugins/choose.js')(client, rng)

    client.say.should.have.been.calledWith('to', 'b')
  })
})
