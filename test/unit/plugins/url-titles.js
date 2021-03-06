/* global describe it */

'use strict'
var chai = require('chai')
var sinon = require('sinon')
chai.should()
chai.use(require('sinon-chai'))

describe('url-titles', () => {
  it('should say nothing if no title', () => {
    var request = (uri, handler) =>
      // ignore the uri
      handler(null, 200,
        '<html><body>lol</body></html>')

    var client = {
      addListener: (name, callback) => {
        callback('from', 'to', 'message containing url https://google.com :D')
      },
      say: sinon.spy()
    }

    require('../../../src/plugins/url-titles.js')(client, request)

    client.say.should.have.not.been.called
  })

  it('should correctly pull out title and say with correct format', () => {
    var request = (uri, handler) =>
      // ignore the uri
      handler(null, 200,
        '<html><head><title>lol</title></head><body>lol</body></html>')

    var client = {
      addListener: (name, callback) => {
        callback('from', 'to', 'message containing url https://google.com :D')
      },
      say: sinon.spy()
    }

    require('../../../src/plugins/url-titles.js')(client, request)

    client.say.should.have.been.calledWith('to', '>>> lol')
  })

  it('should also work on PMs', () => {
    var request = (uri, handler) =>
      // ignore the uri
      handler(null, 200,
        '<html><head><title>lol</title></head><body>lol</body></html>')

    var client = {
      addListener: (name, callback) => {
        callback('you', 'me', 'message containing url https://google.com :D')
      },
      say: sinon.spy(),
      nick: 'me'
    }

    require('../../../src/plugins/url-titles.js')(client, request)

    client.say.should.have.been.calledWith('you', '>>> lol')
  })

  it('should change newlines in titles to spaces', () => {
    var request = (uri, handler) => {
      handler(null, 200,
        `<html><head><title>lol

        who put all these newlines in?

        How silly.
        </title></head><body>lol</body></html>`
      )
    }

    var client = {
      addListener: (name, callback) => {
        callback('you', 'me', 'message containing url https://google.com :D')
      },
      say: sinon.spy(),
      nick: 'me'
    }

    require('../../../src/plugins/url-titles.js')(client, request)

    client.say.should.have.been.calledWith('you', '>>> lol who put all these newlines in? How silly.')
  })
})
