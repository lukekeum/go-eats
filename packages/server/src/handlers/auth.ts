import { IUserTokenCookie } from '@src/entities/user.entity';
import { FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';

const authHook: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.decorateRequest('token', {});
  fastify.addHook('preParsing', async (req, res) => {
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
