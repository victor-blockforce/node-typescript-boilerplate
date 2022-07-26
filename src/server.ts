import path = require('path');
import AutoLoad from '@fastify/autoload';
import fastify, { FastifyInstance } from 'fastify';
import log from './utils/log';
import { loadConfig } from './config';

export async function initServer(opts = {}): Promise<FastifyInstance> {
  const server = fastify({
    logger: log,
    maxParamLength: 108,
  });

  loadConfig();

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  server.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  server.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts),
  });
  return server;
}
