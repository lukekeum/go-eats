import { FastifyPluginCallback } from 'fastify';

const logoutRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/', (req, res) => {
    res.setCookie('token', '', { httpOnly: true });
    res.send(201).send({ message: 'Logged out successfully' });
  });

  done();
};

export default logoutRoute;
