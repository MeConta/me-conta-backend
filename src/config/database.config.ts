import { join } from 'path';
import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

const database = registerAs('database', () => {
  return {
    type: 'postgres',
    logging: true,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV === 'development',
    logger: process.env.NODE_ENV === 'development' ? 'advanced-console' : null,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migration/*.js'],
    cli: {
      migrationsDir: 'migration',
    },
  } as ConnectionOptions;
});

export default database;
