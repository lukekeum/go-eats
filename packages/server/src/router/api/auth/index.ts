import { FastifyPluginCallback } from 'fastify';

import signUpRoute from './signup';
import signInRoute from './signin';
import silentRefresh from './silentRefresh';
import logoutRoute from './logout';

const authRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(signUpRoute, { prefix: '/signup' });
  fastify.register(signInRoute, { prefix: '/signin' });
  fastify.register(silentRefresh, { prefix: '/silent-refresh' });
  fastify.register(logoutRoute, { prefix: '/logout' });

  done();
};

export default authRoute;
