import { ConnectionOptions } from 'typeorm';
import entities from './entities';

const connectionOptions: ConnectionOptions = {
  entities,
  type: 'postgres',
  port: 5432,
  database: process.env.TYPEORM_DATABASE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  synchronize: true,
  logging: false,
  dropSchema: false,
};

export default connectionOptions;
