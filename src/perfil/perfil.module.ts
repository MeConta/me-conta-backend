import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PerfilDbEntity } from '../_adapters/perfil/entidades/perfil.db.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PerfilDbEntity])],
})
export class PerfilModule {}
