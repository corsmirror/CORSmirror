'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var supertest = require('supertest');
var nock = require('nock');
var request = require('request');
var app = require('../app');
var agent = supertest.agent(app);

/**
 * `/v1` routes.
 */
describe('v1 routes', function() {

    describe('cors', function() {

        describe('`url` query parameter', function() {
            it('responds with 404 if query is not found', function(done) {
                agent
                    .get('/v1/cors')
                    .expect(404)
                    .expect(function(res) {
                        assert.equal(res.text, 'Please specify a valid `url` query parameter.');
                    })
                    .end(done);
            });

            it('responds with 500 if query is invalid', function(done) {
                agent
                    .get('/v1/cors?url=invalid')
                    .expect(500)
                    .expect(function(res) {
                        assert.equal(res.text, 'Invalid URI "invalid"');
                    })
                    .end(done);
            });

            it('responds with content and CORS headers if query is valid', function(done) {
                var url = 'http://foo.bar';

                nock(url)
                    .get('/')
                    .reply(200, 'OK');

                agent
                    .get('/v1/cors?url=' + url)
                    .expect(200)
                    .expect('Access-Control-Allow-Origin', '*')
                    .expect(function(res) {
                        assert.equal(res.text, 'OK');
                    })
                    .end(done);
            });

            // make sure the response headers do not override Express CORS headers
            it('removes response CORS headers if present', function(done) {
                var url = 'http://foo.bar';
                var headers = {
                    'Access-Control-Allow-Origin': 'http://foo.bar',
                    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
                    'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
                    'Access-Control-Max-Age': 86400,
                    // make sure other header fields are kept
                    'Content-Type': 'application/json'
                };
                var body = {
                    foo: 'bar'
                };

                nock(url)
                    .get('/')
                    .reply(200, JSON.stringify(body), headers);

                agent
                    .get('/v1/cors?url=' + url)
                    .expect(200)
                    .expect('Access-Control-Allow-Origin', '*')
                    .expect('Content-Type', /json/)
                    .expect(function(res) {
                        assert.deepEqual(res.body, body);
                    })
                    .end(done);
            });
        });

        // sanity check to confirm that `request` lowercases the header field names
        describe('request', function() {
            it('should lowercase response headers', function(done) {
                var url = 'http://response-headers.test';

                nock(url)
                    .get('/')
                    .reply(200, 'OK', { 'X-Foo-Header': 'foo' });

                request(url, function(error, response, body) {
                    assert.deepEqual(response.headers, {
                        'x-foo-header': 'foo'
                    });
                    done();
                });
            });
        });

    });

});
