const assert = require('assert');
const supertest = require('supertest');
const app = require('../app');
const agent = supertest.agent(app);

/**
 * Default routes.
 */
describe('default routes', () => {
  describe('home page', () => {
    afterEach(() => {
      delete process.env.GOOGLE_ANALYTICS_ID;
    });

    it('responds with 200 and html', (done) => {
      agent
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect((res) => {
          assert(!/google-analytics/.test(res.text));
        })
        .end(done);
    });

    it('renders Google Analytics if ID is present', (done) => {
      const gaId = 'UA-00000000-0';
      process.env.GOOGLE_ANALYTICS_ID = gaId;
      agent
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect((res) => {
          assert(/google-analytics/.test(res.text));
          assert(new RegExp(gaId).test(res.text));
        })
        .end(done);
    });
  });

  describe('error page', () => {
    it('responds with 404 and html', (done) => {
      agent.get('/404').expect(404).expect('Content-Type', /html/).end(done);
    });
  });

  describe('heartbeat', () => {
    it('responds with 200 OK', (done) => {
      agent
        .get('/heartbeat')
        .expect(200)
        .expect((res) => {
          assert.deepEqual(res.body, {
            status: 200,
            message: 'OK',
          });
        })
        .end(done);
    });
  });
});
