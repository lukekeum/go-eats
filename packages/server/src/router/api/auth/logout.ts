import { FastifyPluginCallback } from 'fastify';
import AuthToken from '@src/entities/authToken.entity';
import { IUserTokenCookie } from '@src/entities/user.entity';

const logoutRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/', async (req, res) => {
    const { token: refreshToken } = <{ token: string | undefined }>req.cookies;

    if (!refreshToken) {
      return res.status(401).send({ message: 'Token not found' });
    }

    try {
      const decodedToken = <IUserTokenCookie>fastify.jwt.decode(refreshToken);

      const tokenEntity = await AuthToken.findOne(decodedToken.token_id);

      if (!tokenEntity) {
        return res.status(401).send({ message: 'Invalid Token' });
      }

      tokenEntity.disabled = true;

      await tokenEntity.save();

      res.setCookie('token', '', { httpOnly: true });
      res.send(201).send({ message: 'Logged out successfully' });
    } catch (err) {
      res.status(501).send({ message: 'Internal Error' });
    }
  });

  done();
};

export default logoutRoute;
