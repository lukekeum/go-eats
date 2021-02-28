import { FastifyPluginCallback } from 'fastify';

import settingRoute from './settings';
import meRoute from './me';

const userRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(meRoute, { prefix: '/me' });
  fastify.register(settingRoute, { prefix: '/settings' });

  done();
};

export default userRoute;
