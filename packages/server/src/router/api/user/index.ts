import { FastifyPluginCallback } from 'fastify';
import meRoute from './me';

const userRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(meRoute, '/me');

  done();
};

export default userRoute;
