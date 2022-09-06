const supertest = require('supertest');
const app = require('../app');

const agent = supertest.agent(app);

describe('GET /', () => {
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
