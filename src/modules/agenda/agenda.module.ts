import { Inject, Module } from '@nestjs/common';
import { CriarSlotAgendaController } from './controllers/criar-slot-agenda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotAgendaDbEntity } from '../../_adapters/agenda/entidades/slot-agenda-db.entity';
import { CriarNovoSlotDeAgenda } from '../../_business/agenda/casos-de-uso/criar-novo-slot-de-agenda.feat';
import {
  IDateAdd,
  IDateEndOf,
  IDateGreaterThan,
  IDateStartOf,
} from '../../_business/agenda/services/date-time.service';
import { MomentDateTimeService } from '../../_adapters/agenda/services/moment-date-time.service';
import { TypeOrmAgendaService } from '../../_adapters/agenda/services/typeorm-agenda.service';
import { UsuarioDbEntity } from '../../_adapters/usuarios/entidades/usuario.db.entity';
import { VoluntarioDbEntity } from '../../_adapters/voluntarios/entidades/voluntario-db.entity';
import { TypeormVoluntarioService } from '../../_adapters/voluntarios/services/typeorm-voluntario.service';
import {
  IBuscarVoluntarios,
  IBuscarVoluntarioViaId,
} from '../../_business/voluntarios/services/voluntario.service';
import { ListarSlotsAgenda } from '../../_business/agenda/casos-de-uso/listar-slots.agenda.feat';
import { ListarSlotsAgendaController } from './controllers/listar-slots-agenda.controller';
import {
  CriarSlotAgendaService,
  IBuscarSlotAgendaByIdService,
  IRemoverSlotAgendaService,
  RecuperaSlotsAgendaService,
} from '../../_business/agenda/services/agenda.service';
import { RemoverSlotAgenda } from '../../_business/agenda/casos-de-uso/remover-slot-agenda.feat';
import { RemoverSlotAgendaController } from './controllers/remover-slot-agenda.controller';

class NestCriarNovoSlotDeAgenda extends CriarNovoSlotDeAgenda {
  constructor(
    @Inject(TypeOrmAgendaService)
    agendaService: CriarSlotAgendaService & RecuperaSlotsAgendaService,
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

class NestRemoverSlotAgenda extends RemoverSlotAgenda {
  constructor(
    @Inject(TypeOrmAgendaService)
    agendaService: IBuscarSlotAgendaByIdService & IRemoverSlotAgendaService,
    @Inject(MomentDateTimeService)
    dateHelpers: IDateGreaterThan,
  ) {
    super(agendaService, dateHelpers);
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
  controllers: [
    CriarSlotAgendaController,
    ListarSlotsAgendaController,
    RemoverSlotAgendaController,
  ],
  providers: [
    {
      provide: CriarNovoSlotDeAgenda,
      useClass: NestCriarNovoSlotDeAgenda,
    },
    {
      provide: ListarSlotsAgenda,
      useClass: NestListarNovoSlotDeAgenda,
    },
    {
      provide: RemoverSlotAgenda,
      useClass: NestRemoverSlotAgenda,
    },
    TypeormVoluntarioService,
    TypeOrmAgendaService,
    MomentDateTimeService,
  ],
})
export class AgendaModule {}
