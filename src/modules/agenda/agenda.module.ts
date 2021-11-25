import { Inject, Module } from '@nestjs/common';
import { CriarSlotAgendaController } from './controllers/criar-slot-agenda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotAgendaDbEntity } from '../../_adapters/agenda/entidades/slot-agenda-db.entity';
import { CriarNovoSlotDeAgenda } from '../../_business/agenda/casos-de-uso/criar-novo-slot-de-agenda.feat';
import {
  IDateAdd,
  IDateEndOf,
  IDateStartOf,
} from '../../_business/agenda/services/date-time.service';
import { MomentDateTimeService } from '../../_adapters/agenda/services/moment-date-time.service';
import { TypeOrmAgendaService } from '../../_adapters/agenda/typeorm-agenda.service';
import { UsuarioDbEntity } from '../../_adapters/usuarios/entidades/usuario.db.entity';
import { VoluntarioDbEntity } from '../../_adapters/voluntarios/entidades/voluntario-db.entity';
import { TypeormVoluntarioService } from '../../_adapters/voluntarios/services/typeorm-voluntario.service';
import {
  IBuscarVoluntarios,
  IBuscarVoluntarioViaId,
} from '../../_business/voluntarios/services/voluntario.service';
import { ListarSlotsAgenda } from '../../_business/agenda/casos-de-uso/listar-slots.agenda.feat';
import { ListarSlotsAgendaController } from './controllers/listar-slots-agenda.controller';

class NestCriarNovoSlotDeAgenda extends CriarNovoSlotDeAgenda {
  constructor(
    @Inject(TypeOrmAgendaService)
    agendaService: TypeOrmAgendaService,
    @Inject(MomentDateTimeService)
    dateTimeUtils: IDateAdd & IDateStartOf & IDateEndOf,
    @Inject(TypeormVoluntarioService)
    voluntarioService: IBuscarVoluntarioViaId,
  ) {
    super(agendaService, dateTimeUtils, voluntarioService);
  }
}

class NestListarNovoSlotDeAgenda extends ListarSlotsAgenda {
  constructor(
    @Inject(TypeormVoluntarioService)
    voluntarioService: IBuscarVoluntarios,
  ) {
    super(voluntarioService);
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SlotAgendaDbEntity,
      VoluntarioDbEntity,
      UsuarioDbEntity,
    ]),
  ],
  controllers: [CriarSlotAgendaController, ListarSlotsAgendaController],
  providers: [
    {
      provide: CriarNovoSlotDeAgenda,
      useClass: NestCriarNovoSlotDeAgenda,
    },
    {
      provide: ListarSlotsAgenda,
      useClass: NestListarNovoSlotDeAgenda,
    },
    TypeormVoluntarioService,
    TypeOrmAgendaService,
    MomentDateTimeService,
  ],
})
export class AgendaModule {}
