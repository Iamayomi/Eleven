const request = require('supertest');
const app = require('../app');
const { User } = require('../models/index');
const jwt = require('jsonwebtoken');

describe('Protect Controller', () => {
  let user, token;

  beforeAll(async () => {
    user = await User.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'ayomide@example.com',
      password: 'password123',
      phone: '1234567890',
    });

    token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  });

  afterAll(async () => {
    await User.destroy({ where: { email: 'ayomide@example.com' } });
  });

  describe('Protected Route', () => {
    it('should protect routes', async () => {
      const response = await request(app)
        .get('/api/protected-route')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
    });

    it('should fail if token is not provided', async () => {
      const response = await request(app).get('/api/protected-route');

      expect(response.status).toBe(401);
    });
  });
});
