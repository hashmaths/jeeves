/* global describe it */

'use strict'
var chai = require('chai')
var sinon = require('sinon')
chai.should()
chai.use(require('sinon-chai'))

describe('market-watch', () => {
  it('should give price of btc if found', () => {
    var request = (uri, handler) =>
      handler(null, 200,
        `{
          "BTCUSD": {
            "ask": 6660.85,
            "bid": 6657.48,
            "last": 6659.59,
            "high": 6763.57,
            "low": 6027.49,
            "open": {
              "day": 6529.71,
              "week": 7067.41,
              "month": 5673.40
            },
            "averages": {
              "day": 6464.36,
              "week": 6523.92,
              "month": 6494.49
            },
            "volume": 253820.33887363,
            "changes": {
              "percent": {
                "day": 1.99,
                "week": -5.77,
                "month": 17.38
              },
              "price": {
                "day": 129.87,
                "week": -407.82,
                "month": 986.19
              }
            },
            "volume_percent": 84.66,
            "timestamp": 1510635118,
            "display_timestamp": "2017-11-14 04:51:58"
          }
        }`)

    var client = {
      addListener: (name, callback) => {
        callback('from', 'to', '!btcusd')
      },
      say: sinon.spy()
    }

    require('../../../src/plugins/market-watch.js')(client, request)

    client.say.should.have.been.calledWith('to', '$6659.59')
  })
})
