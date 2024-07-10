const request = require('supertest');
const app = require('../app');
const { User, Organisation } = require('../models/index');
const signToken = require('../utils/signToken');

jest.mock('../utils/signToken', () => jest.fn());

describe('Authentication Controller', () => {
  let user;

  beforeAll(async () => {
    user = await User.create({
      firstName: 'ayomide',
      lastName: 'Doe',
      email: 'ayomide@example.com',
      password: 'password123',
      phone: '1234567890',
    });
  });

  afterAll(async () => {
    await User.destroy({ where: { email: 'ayomide@gmail.com' } });
  });

  describe('POST /auth/register', () => {
    it('should register a new user', async () => {
      signToken.mockResolvedValue('test_token');

      const response = await request(app)
        .post('/auth/register')
        .send({
          firstName: 'Jane',
          lastName: 'Ayomide',
          email: 'ayomide@gmail.com',
          password: 'password123',
          phone: '0987654321',
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.accessToken).toBe('test_token');

      await User.destroy({ where: { email: 'ayomide@gmail.com' } });
    });
  });

  describe('POST /auth/login', () => {
    it('should login an existing user', async () => {
      signToken.mockResolvedValue('test_token');

      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'ayomide@gmail.com',
          password: 'password123',
        });

      expect(response.status).toBe(201);
      expect(response.body.status).toBe('success');
      expect(response.body.data.accessToken).toBe('test_token');
    });
  });
});
