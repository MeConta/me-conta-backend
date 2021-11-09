import { ConfigService } from './src/config/config.service';
import { config } from 'dotenv-flow';
import { join } from 'path';

const { parsed } = config({
  node_env: process.env.NODE_ENV || 'development',
});
if (parsed) {
  for (const [key, value] of Object.entries(parsed)) {
    process.env[key] = process.env[key] || value;
  }
}

export default {
  ...new ConfigService(process.env).typeOrmOptions,
  migrations: [join('migration', '**', '*.ts')],
  cli: {
    migrationsDir: 'migration',
  },
};
