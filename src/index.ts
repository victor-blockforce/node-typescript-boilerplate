import { FastifyInstance } from 'fastify';
import { globalConfig } from './config';
import { initServer } from './server';

initServer()
  .then((server: FastifyInstance) => {
    console.log(server.printRoutes());

    server
      .listen({
        port: globalConfig.port,
        host: '0.0.0.0',
      })
      .then(console.log)
      .catch((err) => {
        console.error(err);
        process.exit(1);
      });
  })
  .catch(console.error);
