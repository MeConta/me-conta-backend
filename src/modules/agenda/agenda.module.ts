import { Inject, Module } from '@nestjs/common';
import { AgendaController } from './controllers/agenda.controller';
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
import { TypeormUsuarioService } from '../../_adapters/usuarios/services/typeorm-usuario.service';
import { UsuarioDbEntity } from '../../_adapters/usuarios/entidades/usuario.db.entity';
import { IBuscarUsuarioViaId } from '../../_business/usuarios/casos-de-uso/buscar-usuario.id.feat';
import { VoluntarioDbEntity } from '../../_adapters/voluntarios/entidades/voluntario-db.entity';

class NestCriarNovoSlotDeAgenda extends CriarNovoSlotDeAgenda {
  constructor(
    @Inject(TypeOrmAgendaService)
    agendaService: TypeOrmAgendaService,
    @Inject(MomentDateTimeService)
    dateTimeUtils: IDateAdd & IDateStartOf & IDateEndOf,
    @Inject(TypeormUsuarioService)
    usuarioService: IBuscarUsuarioViaId,
  ) {
    super(agendaService, dateTimeUtils, usuarioService);
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
  controllers: [AgendaController],
  providers: [
    {
      provide: CriarNovoSlotDeAgenda,
      useClass: NestCriarNovoSlotDeAgenda,
    },
    TypeormUsuarioService,
    TypeOrmAgendaService,
    MomentDateTimeService,
  ],
})
export class AgendaModule {}
