import database from './src/config/database.config';
import { config } from 'dotenv-flow';

const { parsed } = config({
  node_env: process.env.NODE_ENV || 'development',
});
if (parsed) {
  for (const [key, value] of Object.entries(parsed)) {
    process.env[key] = process.env[key] || value;
  }
}

export default database();
