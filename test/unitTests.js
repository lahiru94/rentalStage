
var should = require("should");
var request = require("request");
var expect = require("chai").expect;
var baseUrl = "http://localhost:3000/";
var util = require("util");


describe('returns home page', function() {
    it('returns home page', function(done) {
        request.get({ url: baseUrl + '/home' },
            function(error, res, body) {
                    expect(res.statusCode).to.equal(200);
                    
                done();
            });
    });
});

describe('returns login page', function() {
    it('returns login page', function(done) {
        request.get({ url: baseUrl + '/login' },
            function(error, res, body) {
                    expect(res.statusCode).to.equal(200);
                    
                done();
            });
    });
});

describe('returns login page', function() {
    it('returns login page', function(done) {
        request.get({ url: baseUrl + '/users/dashbord' },
            function(error, res, body) {
                    expect(res.statusCode).to.equal(200);
                    
                done();
            });
    });
});