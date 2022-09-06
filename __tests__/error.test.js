const supertest = require('supertest');
const app = require('../app');

const agent = supertest.agent(app);

describe('error', () => {
  it('responds with 404 and html', (done) => {
    agent.get('/404').expect(404).expect('Content-Type', /html/).end(done);
  });
});
