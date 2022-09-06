const supertest = require('supertest');
const app = require('../app');

const agent = supertest.agent(app);

describe('default routes', () => {
  describe('home page', () => {
    it('responds with 200 and html', (done) => {
      agent
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .expect((response) => {
          expect(response.text).not.toMatch('google-analytics');
        })
        .end(done);
    });

    describe('Google Analytics', () => {
      const googleAnalyticsId = 'UA-00000000-0';

      beforeAll(() => {
        process.env.GOOGLE_ANALYTICS_ID = googleAnalyticsId;
      });

      afterAll(() => {
        delete process.env.GOOGLE_ANALYTICS_ID;
      });

      it('renders Google Analytics if ID is present', (done) => {
        agent
          .get('/')
          .expect(200)
          .expect('Content-Type', /html/)
          .expect((response) => {
            expect(response.text).toMatch('google-analytics');
            expect(response.text).toMatch(googleAnalyticsId);
          })
          .end(done);
      });
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
        .expect((response) => {
          expect(response.body).toEqual({
            status: 200,
            message: 'OK',
          });
        })
        .end(done);
    });
  });
});
