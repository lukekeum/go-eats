import { FastifyPluginCallback } from 'fastify';

import signUpRoute from './signup';
import signInRoute from './signin';

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(signUpRoute, { prefix: '/signup' });
  fastify.register(signInRoute, { prefix: '/signin' });

  done();
};

export default authRoute;
