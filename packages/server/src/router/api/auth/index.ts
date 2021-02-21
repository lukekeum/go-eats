import { FastifyPluginCallback } from 'fastify';

import signUpRoute from './signup';

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(signUpRoute, { prefix: '/signup' });

  done();
};

export default authRoute;
