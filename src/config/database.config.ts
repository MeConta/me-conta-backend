import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';
import { join } from 'path';

const database = registerAs('database', () => {
  console.log('ENV', process.env.NODE_ENV);
  return {
    type: 'postgres',
    logging: true,
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    logger: process.env.NODE_ENV === 'development' ? 'advanced-console' : null,
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    migrations: ['migration/**/*.ts'],
    cli: {
      migrationsDir: 'migration',
    },
    extra: {
      ssl: /*process.env.NODE_ENV === 'production'
          ? {
              rejectUnauthorized: false,
            }
          :*/ null,
    },
  } as ConnectionOptions;
});

export default database;
