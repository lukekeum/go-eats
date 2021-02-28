import User, { IUserTokenCookie } from '@src/entities/user.entity';
import UserProfile from '@src/entities/userProfile.entity';
import { FastifyPluginCallback } from 'fastify';
import { decode } from 'punycode';

const meRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.get('/', async (req, res) => {
    const { token: refreshToken } = <{ token: string | undefined }>req.cookies;

    if (!refreshToken) {
      return res.status(401).send({ message: 'Token not found' });
    }

    try {
      const decodedToken = <IUserTokenCookie>fastify.jwt.decode(refreshToken);

      const user = await User.findOne({ uuid: decodedToken.user_id });
      const userProfile = await UserProfile.findOne({
        fk_user_id: decodedToken.user_id,
      });

      if (!decodedToken || !user || !userProfile) {
        return res.status(401).send({ message: 'Invalid TOken' });
      }

      return res.status(201).send({
        data: {
          email: user.email,
          type: user.userType,
          username: userProfile.username,
        },
      });
    } catch (err) {
      fastify.log.error(err);
    }
  });

  done();
};

export default meRoute;
