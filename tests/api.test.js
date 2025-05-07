const request = require('supertest');
const app = require('../src/index');

describe('API de notas', () => {
  it('GET /notes debe retornar un array vacío inicialmente', async () => {
    const res = await request(app).get('/notes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /notes debe crear una nota', async () => {
    const res = await request(app)
      .post('/notes')
      .send({ title: 'Nota 1', content: 'Contenido 1' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('title', 'Nota 1');
    expect(res.body).toHaveProperty('content', 'Contenido 1');
  });

  it('DELETE /notes/:id debe eliminar una nota existente', async () => {
    const post = await request(app)
      .post('/notes')
      .send({ title: 'Eliminar', content: 'Esta será eliminada' });
    
    const res = await request(app).delete(`/notes/${post.body.id}`);
    expect(res.statusCode).toBe(204);
  });

  it('DELETE /notes/:id con id inexistente debe retornar 404', async () => {
    const res = await request(app).delete('/notes/9999');
    expect(res.statusCode).toBe(404);
  });
});
