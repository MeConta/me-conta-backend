import { Module } from '@nestjs/common';
import { CadastroInicialController } from './cadastro-inicial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioDbEntity } from '../_adapters/usuarios/entidades/usuario.db.entity';
import { TypeormUsuarioService } from '../_adapters/usuarios/typeorm-usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioDbEntity])],
  providers: [TypeormUsuarioService],
  controllers: [CadastroInicialController],
})
export class CadastroInicialModule {}
