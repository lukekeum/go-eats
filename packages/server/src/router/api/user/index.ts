import { FastifyPluginCallback } from 'fastify';
import meRoute from './me';

const userRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(meRoute, { prefix: '/me' });

  done();
};

export default userRoute;
