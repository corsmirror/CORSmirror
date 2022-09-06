const supertest = require('supertest');
const nock = require('nock');
const request = require('request');
const app = require('../app');

const agent = supertest.agent(app);

describe('v1 routes', () => {
  describe('cors', () => {
    describe('`url` query parameter', () => {
      it('responds with 404 if query is not found', (done) => {
        agent
          .get('/v1/cors')
          .expect(404)
          .expect((response) => {
            expect(response.text).toBe(
              'Please specify a valid `url` query parameter.'
            );
          })
          .end(done);
      });

      it('responds with 500 if query is invalid', (done) => {
        agent
          .get('/v1/cors?url=invalid')
          .expect(500)
          .expect((response) => {
            expect(response.text).toBe('Invalid URI "invalid"');
          })
          .end(done);
      });

      it('responds with matching status code', (done) => {
        const url = 'http://foo.bar';
        nock(url).get('/').reply(301);

        agent
          .get('/v1/cors?url=' + url)
          .expect(301)
          .end(done);
      });

      it('responds with content and CORS headers if query is valid', (done) => {
        const url = 'http://foo.bar';
        nock(url).get('/').reply(200, 'OK');

        agent
          .get('/v1/cors?url=' + url)
          .expect(200)
          .expect('Access-Control-Allow-Origin', '*')
          .expect((response) => {
            expect(response.text).toBe('OK');
          })
          .end(done);
      });

      // make sure the response headers do not override Express CORS headers
      it('removes response CORS headers if present', (done) => {
        const url = 'http://foo.bar';
        const headers = {
          'Access-Control-Allow-Origin': 'http://foo.bar',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
          'Access-Control-Max-Age': 86400,
          // make sure other header fields are kept
          'Content-Type': 'application/json',
        };
        const body = {
          foo: 'bar',
        };

        nock(url).get('/').reply(200, JSON.stringify(body), headers);

        agent
          .get('/v1/cors?url=' + url)
          .expect(200)
          .expect('Access-Control-Allow-Origin', '*')
          .expect('Content-Type', /json/)
          .expect((response) => {
            expect(response.body).toEqual(body);
          })
          .end(done);
      });
    });

    // additional query parameters which can override response headers
    describe('additional query parameters', () => {
      it('sets an HTTP header field', (done) => {
        const url = 'http://foo.bar';
        nock(url).get('/').reply(200, 'OK');

        agent
          .get('/v1/cors?url=' + url + '&x-foo=bar')
          .expect('x-foo', 'bar')
          .end(done);
      });

      it('does nothing for binary parameters', (done) => {
        const url = 'http://foo.bar';
        nock(url).get('/').reply(200, 'OK', { accept: 'text/plain' });

        agent
          .get('/v1/cors?url=' + url + '&accept')
          .expect('accept', 'text/plain')
          .end(done);
      });

      it('overrides an HTTP header field', (done) => {
        const url = 'http://foo.bar';
        nock(url).get('/').reply(200, 'OK', { etag: 'foo' });

        agent
          .get('/v1/cors?url=' + url + '&etag=bar')
          .expect('etag', 'bar')
          .end(done);
      });

      it('does not need to be case-sensitive', (done) => {
        const url = 'http://foo.bar';
        nock(url).get('/').reply(200, 'OK', { 'accept-encoding': 'gzip' });

        agent
          .get('/v1/cors?url=' + url + '&Accept-Encoding=gzip,deflate')
          .expect('accept-encoding', 'gzip,deflate')
          .end(done);
      });

      it('throws an error if "content-type" is invalid', (done) => {
        const url = 'http://foo.bar';
        nock(url).get('/').reply(200, 'OK', { 'content-type': 'text/plain' });

        agent
          .get('/v1/cors?url=' + url + '&content-type=application')
          .expect(500)
          .expect((response) => {
            expect(response.text).toBe('Invalid "Content-Type" parameter.');
          })
          .end(done);
      });
    });

    // sanity check to confirm that `request` lowercases the header field names
    describe('request', () => {
      it('should lowercase response headers', (done) => {
        const url = 'http://response-headers.test';

        nock(url).get('/').reply(200, 'OK', { 'X-Foo-Header': 'foo' });

        request(url, (error, response) => {
          expect(response.headers).toEqual({
            'x-foo-header': 'foo',
          });
          done();
        });
      });
    });
  });
});
