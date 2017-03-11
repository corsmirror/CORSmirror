'use strict';

/**
 * Module dependencies.
 */
var assert = require('assert');
var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);

/**
 * Default routes.
 */
describe('default routes', function() {

    describe('home page', function() {
        afterEach(function() {
            delete process.env.GOOGLE_ANALYTICS_ID;
        });

        it('responds with 200 and html', function(done) {
            agent
                .get('/')
                .expect(200)
                .expect('Content-Type', /html/)
                .expect(function(res) {
                    assert(!/google-analytics/.test(res.text));
                })
                .end(done);
        });

        it('renders Google Analytics if ID is present', function(done) {
            var gaId = 'UA-00000000-0';
            process.env.GOOGLE_ANALYTICS_ID = gaId;
            agent
                .get('/')
                .expect(200)
                .expect('Content-Type', /html/)
                .expect(function(res) {
                    assert(/google-analytics/.test(res.text));
                    assert(new RegExp(gaId).test(res.text));
                })
                .end(done);
        });
    });

    describe('error page', function() {
        it('responds with 404 and html', function(done) {
            agent
                .get('/404')
                .expect(404)
                .expect('Content-Type', /html/)
                .end(done);
        });
    });

    describe('heartbeat', function() {
        it('responds with 200 OK', function(done) {
            agent
                .get('/heartbeat')
                .expect(200)
                .expect(function(res) {
                    assert.deepEqual(res.body, {
                        status: 200,
                        message: 'OK'
                    });
                })
                .end(done);
        });
    });

});
