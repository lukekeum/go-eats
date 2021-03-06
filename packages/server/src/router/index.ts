import apiRoute from './api';

import { FastifyPluginCallback } from 'fastify';

const rootRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(apiRoute, { prefix: '/api' });
};

export default rootRoute;
