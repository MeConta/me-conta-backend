import { Inject, Injectable, Module } from '@nestjs/common';
import { TypeormAlunoService } from '../../_adapters/alunos/services/typeorm-aluno.service';
import {
  IAtualizarStatusAtendimentoService,
  IBuscarAtendimentoViaIdService,
  IHistoricoAtendimentoService,
  INovoAtendimentoService,
} from '../../_adapters/atendimentos/services/atendimentos.service';
import { TypeormAtendimentosService } from '../../_adapters/atendimentos/services/typeorm-atendimentos.service';
import { CriarAtendimento } from '../../_business/atendimentos/casos-de-uso/criar-atendimento.feat';
import { TypeormVoluntarioService } from '../../_adapters/voluntarios/services/typeorm-voluntario.service';
import { IBuscarAlunoViaId } from '../../_business/alunos/casos-de-uso/atualizar-aluno.feat';
import { IDateGreaterThan } from '../../_business/agenda/services/date-time.service';
import { MomentDateTimeService } from '../../_adapters/agenda/services/moment-date-time.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoluntarioDbEntity } from '../../_adapters/voluntarios/entidades/voluntario-db.entity';
import { UsuarioDbEntity } from '../../_adapters/usuarios/entidades/usuario.db.entity';
import { CriarAtendimentoController } from './controllers/criar-atendimento.controller';
import { AtendimentosDbEntity } from '../../_adapters/atendimentos/entidades/atendimentos-db.entity';
import { AlunoDbEntity } from '../../_adapters/alunos/entidades/aluno.db.entity';
import { HistoricoAtendimento } from '../../_business/atendimentos/casos-de-uso/historico-atendimento.feat';
import { HistoricoAtendimentoController } from './controllers/historico-atendimento.controller';
import { AtualizarAtendimentoController } from './controllers/atualizar-atendimento.controller';
import { AtualizarAtendimento } from '../../_business/atendimentos/casos-de-uso/atualizar-atendimento.feat';
import { IBuscarSlotAgendaByIdService } from '../../_business/agenda/services/agenda.service';
import { TypeOrmAgendaService } from '../../_adapters/agenda/services/typeorm-agenda.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './services/TaskService';
import { SlotAgendaDbEntity } from '../../_adapters/agenda/entidades/slot-agenda-db.entity';

@Injectable()
class NestCriarAtendimento extends CriarAtendimento {
  constructor(
    @Inject(TypeormAtendimentosService)
    atendimentoService: INovoAtendimentoService,
    @Inject(TypeOrmAgendaService)
    slotAgendaService: IBuscarSlotAgendaByIdService,
    @Inject(TypeormAlunoService)
    alunoService: IBuscarAlunoViaId,
    @Inject(MomentDateTimeService)
    dateHelper: IDateGreaterThan,
  ) {
    super(atendimentoService, slotAgendaService, alunoService, dateHelper);
  }
}

@Injectable()
class NestHistoricoAtendimento extends HistoricoAtendimento {
  constructor(
    @Inject(TypeormAtendimentosService)
    atendimentoService: IHistoricoAtendimentoService,
    @Inject(TypeormAlunoService)
    alunoService: IBuscarAlunoViaId,
  ) {
    super(alunoService, atendimentoService);
  }
}

@Injectable()
class NestAtualizarAtendimento extends AtualizarAtendimento {
  constructor(
    @Inject(TypeormAtendimentosService)
    atendimentoService: IBuscarAtendimentoViaIdService &
      IAtualizarStatusAtendimentoService,
  ) {
    super(atendimentoService);
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AtendimentosDbEntity,
      AlunoDbEntity,
      VoluntarioDbEntity,
      UsuarioDbEntity,
      SlotAgendaDbEntity,
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [
    CriarAtendimentoController,
    HistoricoAtendimentoController,
    AtualizarAtendimentoController,
  ],
  providers: [
    {
      provide: CriarAtendimento,
      useClass: NestCriarAtendimento,
    },
    {
      provide: HistoricoAtendimento,
      useClass: NestHistoricoAtendimento,
    },
    {
      provide: AtualizarAtendimento,
      useClass: NestAtualizarAtendimento,
    },
    TypeormAtendimentosService,
    TypeOrmAgendaService,
    TypeormVoluntarioService,
    TypeormAlunoService,
    MomentDateTimeService,
    TasksService,
  ],
})
export class AtendimentoModule {}
