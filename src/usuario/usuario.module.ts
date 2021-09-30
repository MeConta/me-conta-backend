import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioDbEntity } from '../_adapters/usuarios/entidades/usuario.db.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioDbEntity])],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
