import { FastifyInstance } from 'fastify';
import { initServer } from '../src/server';

describe('HealthController (e2e)', () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await initServer();
  });
  afterAll(async () => {
    await app.close();
  });

  it('/health/alive (GET)', () => {
    return app.inject().get('/health/alive').then(res => expect(res.statusCode).toBe(200));
  });
  it('/health/ready (GET)', () => {
    return app.inject().get('/health/ready').then(res => expect(res.statusCode).toBe(200));
  });
});
