import 'reflect-metadata';
import { FastifyInstance } from 'fastify';
import { initServer } from './server';

initServer()
  .then((server: FastifyInstance) => {
    console.log(server.printRoutes());

    server.listen(process.env.PORT || 8080, '0.0.0.0', (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
  })
  .catch(console.error);
