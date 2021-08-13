import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../src/usuario/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: ['./**/*.entity.ts'],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbE2eModule {}
