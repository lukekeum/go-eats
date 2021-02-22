import User from '@src/entities/user.entity';
import { FastifyPluginCallback } from 'fastify';
import bcrypt from 'bcrypt';
import app from '@src/app';
import UserProfile from '@src/entities/userProfile.entity';

interface ISignInBody {
  email: string;
  password: string;
}

const signInRoute: FastifyPluginCallback = (fastify, opts, done) => {
  fastify.post('/', async (req, res) => {
    const body = <ISignInBody>req.body;

    if (!body) {
      return res.status(401).send({ message: 'Unknown input' });
    }

    try {
      const user = await User.findOne({ email: body.email });

      if (!user) {
        return res.status(401).send({ message: 'Email user not found' });
      }

      const isPasswordCorrect = await bcrypt.compare(
        body.password,
        user.password
      );

      if (!isPasswordCorrect) {
        return res.status(401).send({ message: 'Password Incorrect' });
      }

      const userProfile = await UserProfile.findOne({ fk_user_id: user.uuid });
      const token = await user.generateAuthToken();

      res.setCookie('token', token.refreshToken, {
        httpOnly: true,
      });

      return res.status(201).send({
        message: 'Signed in successfully',
        data: { email: body.email, username: userProfile?.username },
        token: token.accessToken,
      });
    } catch (err) {
      app.server.log.error(err);
      return res.status(500).send({ message: err });
    }
  });

  done();
};

export default signInRoute;
