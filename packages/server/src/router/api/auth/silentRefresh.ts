import AuthToken from '@src/entities/authToken.entity';
import User from '@src/entities/user.entity';
import UserProfile from '@src/entities/userProfile.entity';
import { FastifyPluginCallback } from 'fastify';

interface IUserTokenCookie {
  user_id: string;
  token_id: string;
}

const silentRefresh: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/', async (req, res) => {
    const { token: refreshToken } = <{ token: string | undefined }>req.cookies;

    if (!refreshToken) {
      return res.status(401).send({ message: 'Token not found' });
    }

    try {
      const decodedUser = <IUserTokenCookie>fastify.jwt.decode(refreshToken);

      const user = await User.findOne({ uuid: decodedUser.user_id });
      const userProfile = await UserProfile.findOne({
        fk_user_id: decodedUser.user_id,
      });
      const tokenEntity = await AuthToken.findOne(decodedUser.token_id);

      if (!decodedUser || !user || !tokenEntity || tokenEntity.disabled) {
        return res.status(401).send({ message: 'Invalid token' });
      }

      tokenEntity.disabled = true;

      const tokens = await user.generateAuthToken();
      res.setCookie('token', tokens.refreshToken);

      await tokenEntity.save();
      return res.status(201).send({
        data: {
          email: user.email,
          username: userProfile?.username,
        },
        token: tokens.accessToken,
      });
    } catch (err) {
      fastify.log.error(err);
    }
  });

  done();
};

export default silentRefresh;
