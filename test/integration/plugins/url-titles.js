"use strict";
var chai = require("chai"),
    expect = chai.expect;

describe("url-titles", function () {
  it("should pull out a google.com url and get the correct title", function (done) {
    var client = {
      addListener: function (name, callback) {
        callback("from", "to", "message containing two urls https://google.com :D");
      },
      say: (to, msg) => {
        expect(to).to.equal("to");
        expect(msg).to.equal(">>> Google");
        done();
      }
    }

    require('../../../src/plugins/url-titles.js')(client)
  });
});
