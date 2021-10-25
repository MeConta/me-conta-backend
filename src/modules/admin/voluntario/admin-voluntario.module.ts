import { Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoluntarioDbEntity } from '../../../_adapters/voluntarios/entidades/voluntario-db.entity';
import { TypeormVoluntarioService } from '../../../_adapters/voluntarios/services/typeorm-voluntario.service';
import { AutorizarVoluntario } from '../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import {
  IAtualizarAprovacaoVoluntario,
  IBuscarVoluntarioViaId,
} from '../../../_business/voluntarios/services/voluntario.service';
import { AutorizarVoluntarioController } from './controllers/voluntarios/autorizar-voluntario.controller';

class NestAutorizarVoluntario extends AutorizarVoluntario {
  constructor(
    @Inject(TypeormVoluntarioService)
    voluntarioService: IBuscarVoluntarioViaId & IAtualizarAprovacaoVoluntario,
  ) {
    super(voluntarioService);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([VoluntarioDbEntity])],
  providers: [
    TypeormVoluntarioService,
    {
      provide: AutorizarVoluntario,
      useClass: NestAutorizarVoluntario,
    },
  ],
  controllers: [AutorizarVoluntarioController],
  exports: [AutorizarVoluntario],
})
export class AdminVoluntarioModule {}
