import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export class ConfigService {
  constructor(private env?: { [k: string]: string | undefined }) {
    if (!env) {
      this.env = process.env;
    }
  }

  private get isDevelopment() {
    return this.env.NODE_ENV === 'development';
  }

  private get isProduction() {
    return this.env.NODE_ENV === 'production';
  }

  get typeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      logging: true,
      url: this.env.DATABASE_URL,
      autoLoadEntities: true,
      logger: this.isDevelopment ? 'advanced-console' : undefined,
      entities: [join('dist', '**', '*.entity.{js,ts}')],
      extra: {
        ssl: this.isProduction
          ? {
              rejectUnauthorized: false,
            }
          : null,
      },
    };
  }
}
