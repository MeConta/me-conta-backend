import { Module } from '@nestjs/common';
import { FrenteAtuacaoService } from './frente-atuacao.service';
import { FrenteAtuacaoController } from './frente-atuacao.controller';

@Module({
  controllers: [FrenteAtuacaoController],
  providers: [FrenteAtuacaoService]
})
export class FrenteAtuacaoModule {}
