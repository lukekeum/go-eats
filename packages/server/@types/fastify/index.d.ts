import fastify from 'fastify';

interface IAuthToken {
  user_id: string;
}

declare module 'fastify' {
  export interface FastifyRequest {
    token: IAuthToken;
  }
}
