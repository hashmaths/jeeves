/* global describe it */

'use strict'

const chai = require('chai')
const expect = chai.expect
const Random = require('random-js')

describe('choose', () => {
  it('should be able to use then RNG pick method successfully', (done) => {
    const client = {
      addListener: (name, callback) => {
        callback('from', 'to', '!c a or b')
      },
      say: (to, msg) => {
        expect(to).to.equal('to')
        expect(msg).to.equal('b')
        done()
      }
    }

    const rng = new Random(Random.engines.mt19937().seed(1))
    require('../../../src/plugins/choose.js')(client, rng)
  })
})
