import { FastifyPluginCallback } from 'fastify';
import User, { IUserTokenCookie } from '@src/entities/user.entity';
import UserSetting from '@src/entities/userSetting.entity';
import authHook from '@src/handlers/auth';

const settingRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authHook);

  fastify.get('/', async (req, res) => {
    try {
      const userData = <IUserTokenCookie>req.token;

      const user = await User.findOne({ uuid: userData.user_id });
      const userSetting = await UserSetting.findOne({
        fk_user_id: userData.user_id,
      });

      if (!userData || !user || !userSetting) {
        return res.status(401).send({ message: 'Invalid Token' });
      }

      return res.status(200).send({
        data: {
          addresses: userSetting.addresses,
          deliver_messages: userSetting.deliver_messages,
        },
      });
    } catch (err) {
      fastify.log.error(err);
      return res.status(500).send({ message: err });
    }
  });

  done();
};

export default settingRoute;
