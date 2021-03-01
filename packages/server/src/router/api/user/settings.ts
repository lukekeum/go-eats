import { FastifyPluginCallback } from 'fastify';
import User, { IUserTokenCookie } from '@src/entities/user.entity';
import UserSetting, { IAddresses } from '@src/entities/userSetting.entity';
import authHook from '@src/handlers/auth';

interface IPostBody {
  addresses: IAddresses[];
  deliver_messages: string[];
}

const settingRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.register(authHook);

  fastify.post('/', async (req, res) => {
    const body = <IPostBody>req.body;

    if (!body) {
      return res.status(401).send({ message: 'Unknown input' });
    }

    try {
      const userData = <IUserTokenCookie>req.token;

      const userSetting = await UserSetting.findOne({
        fk_user_id: userData.user_id,
      });

      if (!userData || !userSetting) {
        return res.status(401).send({ message: 'Invalid Token' });
      }

      userSetting.addresses = body.addresses;
      userSetting.deliver_messages = body.deliver_messages;

      await userSetting.save();

      return res.status(201).send({
        message: 'Setting completed',
        data: {
          addresses: userSetting.addresses,
          deliver_messages: userSetting.deliver_messages,
        },
      });
    } catch (err) {
      fastify.log.error(err);
      return res.status(500).send({ message: 'Internal Error occured' });
    }
  });

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
      return res.status(500).send({ message: 'Internal Error occured' });
    }
  });

  done();
};

export default settingRoute;
