const request = require('supertest');
const app = require('../app');

describe('healthcheck', () => {
  it('responds with 200 OK', async () => {
    const response = await request(app).get('/healthcheck');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });
});
