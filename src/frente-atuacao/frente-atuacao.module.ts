import { Module } from '@nestjs/common';
import { FrenteAtuacaoService } from './frente-atuacao.service';
import { FrenteAtuacaoController } from './frente-atuacao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrenteAtuacao } from './entities/frente-atuacao.entity';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [UsuarioModule, TypeOrmModule.forFeature([FrenteAtuacao])],
  controllers: [FrenteAtuacaoController],
  providers: [FrenteAtuacaoService],
  exports: [UsuarioModule, FrenteAtuacaoService],
})
export class FrenteAtuacaoModule {}
