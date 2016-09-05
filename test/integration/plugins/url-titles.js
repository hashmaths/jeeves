/* global describe it */

'use strict'

const chai = require('chai')
const expect = chai.expect
const request = require('request')

describe('url-titles', () => {
  it('should pull out a google.com url and get the correct title', (done) => {
    var client = {
      addListener: (name, callback) => {
        callback('from', 'to', 'message containing two urls https://google.com :D')
      },
      say: (to, msg) => {
        expect(to).to.equal('to')
        expect(msg).to.equal('>>> Google')
        done()
      }
    }

    require('../../../src/plugins/url-titles.js')(client, request)
  })
})
