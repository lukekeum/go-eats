import fastify, { FastifyInstance } from 'fastify';
import fastifyCompress from 'fastify-compress';
import fastifyCors from 'fastify-cors';
import fastifyJWT from 'fastify-jwt';
import fastifyCookie from 'fastify-cookie';

import apiRoute from './router/api';

class App {
  public server: FastifyInstance;

  constructor() {
    this.server = fastify({ logger: true });

    this.server.register(apiRoute, { prefix: '/api' });

    this.server.register(fastifyCompress);
    this.server.register(fastifyCors, { origin: true, credentials: true });
    this.server.register(fastifyCookie);
    this.server.register(fastifyJWT, {
      secret: process.env.ACCESS_TOKEN_SECRET || '',
    });
  }

  public async start() {
    const { PORT = String(5000) } = process.env;

    try {
      await this.server.listen(PORT, '0.0.0.0');
    } catch (err) {
      this.server.log.error(err);
    }
  }
}

const app = new App();

export default app;
