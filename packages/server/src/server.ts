import './config/dotenv';
import 'reflect-metadata';
import app from './app';
import { createConnection } from 'typeorm';
import connectionOptions from './database';

createConnection(connectionOptions)
  .then(() => {
    app.server.log.info('Database Connected with Typeorm');
    app.start();
  })
  .catch((err) => {
    app.server.log.error(err);
  });
