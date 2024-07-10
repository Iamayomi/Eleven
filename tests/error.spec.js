const request = require('supertest');
const app = require('../app');
const CustomError = require('../utils/customError');

describe('Error Handling', () => {
  it('should return custom error for invalid routes', async () => {
    const response = await request(app).get('/invalid-route');

    expect(response.status).toBe(400);
    expect(response.body.status).toBe('Bad Request');
  });
});
