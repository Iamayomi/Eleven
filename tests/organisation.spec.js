const request = require('supertest');
const app = require('../app');
const { User, Organisation } = require('../models/index');
const signToken = require('../utils/signToken');

jest.mock('../utils/signToken', () => jest.fn());

describe('Organisation Controller', () => {
  let user, token;

  beforeAll(async () => {
    user = await User.create({
      firstName: 'John',
      lastName: 'Ayomide',
      email: 'ayomide@gmail.com',
      password: 'password123',
      phone: '1234567890',
    });

    token = await signToken(user.id);
  });

  afterAll(async () => {
    await User.destroy({ where: { email: 'ayomide@gmail.com' } });
    await Organisation.destroy({ where: { userId: user.id } });
  });

  describe('GET /api/organisations', () => {
    it('should get all organisations for a user', async () => {
      const response = await request(app)
        .get('/api/organisations')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('Success');
    });
  });

  describe('POST /api/organisations', () => {
    it('should create a new organisation', async () => {
      const response = await request(app)
        .post('/api/organisations')
        .set('Authorization', `Bearer ${token}`)
        .send({ description: 'New Organisation' });

      expect(response.status).toBe(201);
    });
  });
});
