import { FastifyRequest } from 'fastify';
import log from '../utils/log';

export async function logMiddleware(req: FastifyRequest) {
  log.info(`${req.method} ${req.context.config['url']}`);
}
