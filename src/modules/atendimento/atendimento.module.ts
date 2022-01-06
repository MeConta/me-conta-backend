import { Inject, Injectable, Module } from '@nestjs/common';
import { TypeormAlunoService } from '../../_adapters/alunos/services/typeorm-aluno.service';
import { INovoAtendimentoService } from '../../_adapters/atendimentos/services/atendimentos.service';
import { TypeormAtendimentosService } from '../../_adapters/atendimentos/services/typeorm-atendimentos.service';
import { CriarAtendimento } from '../../_business/atendimentos/casos-de-uso/criar-atendimento.feat';
import { TypeormVoluntarioService } from '../../_adapters/voluntarios/services/typeorm-voluntario.service';
import { IBuscarVoluntarioViaId } from '../../_business/voluntarios/services/voluntario.service';
import { IBuscarAlunoViaId } from '../../_business/alunos/casos-de-uso/atualizar-aluno.feat';
import { IDateGreaterThan } from '../../_business/agenda/services/date-time.service';
import { MomentDateTimeService } from '../../_adapters/agenda/services/moment-date-time.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoluntarioDbEntity } from '../../_adapters/voluntarios/entidades/voluntario-db.entity';
import { UsuarioDbEntity } from '../../_adapters/usuarios/entidades/usuario.db.entity';
import { CriarAtendimentoController } from './controllers/criar-atendimento.controller';
import { AtendimentosDbEntity } from '../../_adapters/atendimentos/entidades/atendimentos-db.entity';
import { AlunoDbEntity } from '../../_adapters/alunos/entidades/aluno.db.entity';

@Injectable()
class NestCriarAtendimento extends CriarAtendimento {
  constructor(
    @Inject(TypeormAtendimentosService)
    atendimentoService: INovoAtendimentoService,
    @Inject(TypeormVoluntarioService)
    voluntarioService: IBuscarVoluntarioViaId,
    @Inject(TypeormAlunoService)
    alunoService: IBuscarAlunoViaId,
    @Inject(MomentDateTimeService)
    dateHelper: IDateGreaterThan,
  ) {
    super(atendimentoService, voluntarioService, alunoService, dateHelper);
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AtendimentosDbEntity,
      AlunoDbEntity,
      VoluntarioDbEntity,
      UsuarioDbEntity,
    ]),
  ],
  controllers: [CriarAtendimentoController],
  providers: [
    {
      provide: CriarAtendimento,
      useClass: NestCriarAtendimento,
    },
    TypeormAtendimentosService,
    TypeormVoluntarioService,
    TypeormAlunoService,
    MomentDateTimeService,
  ],
})
export class AtendimentoModule {}
