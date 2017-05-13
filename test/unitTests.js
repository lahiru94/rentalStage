
var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "http://localhost:3000/";
var util = require("util");


describe('returns luke', function() {
    it('returns luke', function(done) {
        request.get({ url: baseUrl + '/home' },
            function(error, res, body) {
                    expect(res.statusCode).to.equal(200);
                    
                done();
            });
    });
});