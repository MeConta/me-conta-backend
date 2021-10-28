import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      autoLoadEntities: true,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class DbE2eModule {}
