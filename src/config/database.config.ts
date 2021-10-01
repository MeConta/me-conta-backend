import { registerAs } from '@nestjs/config';
import { ConnectionOptions } from 'typeorm';

const database = registerAs('database', () => {
  return {
    type: 'postgres',
    logging: true,
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    logger: process.env.NODE_ENV === 'development' ? 'advanced-console' : null,
    entities: ['dist/**/entities/*.entity.js', '!dist/**/__old/**/*'],
    migrations: ['dist/migration/*.js'],
    // TODO: remover
    synchronize: true,
    cli: {
      migrationsDir: 'migration',
    },
    extra: {
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              rejectUnauthorized: false,
            }
          : null,
    },
  } as ConnectionOptions;
});

export default database;
