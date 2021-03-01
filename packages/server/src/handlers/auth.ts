import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

const authHook: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.decorateRequest('token', null);
  fastify.addHook('onRequest', async (req, res) => {
    const authToken = req.headers['authorization'];

    if (!authToken || Array.isArray(authToken)) {
      return;
    }

    const token = authToken.split(' ')[1];

    const decodedToken = <{ user_id: string }>fastify.jwt.decode(token);

    if (!decodedToken) {
      return;
    }

    req.token = decodedToken;
    return;
  });
  done();
};

export default fp(authHook);
