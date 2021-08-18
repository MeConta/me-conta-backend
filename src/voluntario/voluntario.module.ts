import { Module } from '@nestjs/common';
import { FrenteAtuacaoModule } from '../frente-atuacao/frente-atuacao.module';

@Module({
  imports: [FrenteAtuacaoModule],
  providers: [],
  exports: [FrenteAtuacaoModule],
})
export class VoluntarioModule {}
