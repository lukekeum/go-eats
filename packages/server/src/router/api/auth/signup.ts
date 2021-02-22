import { FastifyPluginCallback } from 'fastify';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import User, { EUserType } from '@src/entities/user.entity';
import app from '@src/app';
import UserProfile from '@src/entities/userProfile.entity';

interface ISignupQuery {
  type: EUserType;
}

interface ISignupBody {
  email: string;
  username: string;
  password: string;
}

const signUpRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/', async (req, res) => {
    const query = <ISignupQuery>req.query;
    const body = <ISignupBody>req.body;

    if (!query || !body) {
      return res.status(401).send({ message: 'Unknown input' });
    }

    try {
      const emailUser = await User.findOne({ email: body.email });

      if (emailUser) {
        return res.status(401).send({ message: 'Email user already exists' });
      }

      const salt = await bcrypt.genSalt(15);
      const password = await bcrypt.hash(body.password, salt);

      const user = new User();
      user.email = body.email;
      user.password = password;
      user.userType = query.type;
      await user.save();

      const userProfile = new UserProfile();
      userProfile.username = body.username;
      userProfile.fk_user_id = user.uuid;
      await getRepository(UserProfile).save(userProfile);

      return res.status(201).send({
        message: 'Signed up successfully',
        data: { email: body.email, username: body.username },
      });
    } catch (err) {
      app.server.log.error(err);
    }
  });

  done();
};

export default signUpRoute;
