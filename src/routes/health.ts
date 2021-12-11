import { FastifyInstance } from 'fastify';
import { alive, ready } from '../controllers/health.controller';
import { HealthSchema } from '../controllers/health.controller/schemas';
import { logMiddleware } from '../middlewares/log.middleware';
import { validateSchema } from '../validations/schemas';

export default async function (fastify: FastifyInstance) {
  fastify.addHook('preHandler', logMiddleware);
  fastify
    .get(
      '/health/alive',
      validateSchema(HealthSchema),
      alive
    )
    .get(
      '/health/ready',
      validateSchema(HealthSchema),
      ready
    );
}
