import AuthToken from '@src/entities/authToken.entity';
import User, { IUserTokenCookie } from '@src/entities/user.entity';
import UserProfile from '@src/entities/userProfile.entity';
import auth from '@src/handlers/auth';
import { FastifyPluginCallback } from 'fastify';

const silentRefresh: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(auth);

  fastify.post('/', async (req, res) => {
    const { token: refreshToken } = <{ token: string }>req.cookies;

    if (!req.token || !refreshToken) {
      return res.status(401).send({ message: 'Invalid Token' });
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
      res.setCookie('token', tokens.refreshToken, {
        httpOnly: true,
        path: '/',
      });

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
