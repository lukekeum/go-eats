import fastify, { FastifyInstance } from 'fastify';
import fastifyCompress from 'fastify-compress';

class App {
  public server: FastifyInstance;

  constructor() {
    this.server = fastify({ logger: true });

    this.server.register(fastifyCompress);
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
