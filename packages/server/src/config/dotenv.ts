import { config } from 'dotenv';
import path from 'path';

const { NODE_ENV = 'development' } = process.env;

config({
  path: path.resolve(
    process.cwd(),
    NODE_ENV === 'development' ? '.env.development' : '.env'
  ),
});
