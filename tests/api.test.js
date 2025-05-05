const request = require('supertest');
const app = require('../src/index');

describe('API de notas', () => {
  it('GET /notes debe responder con array', async () => {
    const res = await request(app).get('/notes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /notes debe crear una nota', async () => {
    const res = await request(app).post('/notes').send({ text: 'Nota 1' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('text', 'Nota 1');
  });
});
