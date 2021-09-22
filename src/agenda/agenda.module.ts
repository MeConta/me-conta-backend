import { Inject, Module } from '@nestjs/common';
import { AgendaController } from './agenda.controller';
import { AgendaService } from './agenda.service';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { SlotAgendaDbEntity } from '../_adapters/agenda/entidades/slot-agenda.db-entity';
import { CriarNovoSlotDeAgenda } from '../_business/atendente/agendamentos/casos-de-uso/criar-novo-slot-de-agenda.feat';
import { AuthorizationService } from '../_business/autorizacao/interfaces/authorization.service';
import { DateTimeUtils } from '../_business/atendente/agendamentos/interfaces/date-time.utils';
import { MomentDateTimeUtils } from '../_business/atendente/agendamentos/fakes/moment-date-time.utils';
import { Tipo } from '../usuario/entities/usuario.enum';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioModule } from '../usuario/usuario.module';

// TODO: Criar testes.
class NestAuthorizationService implements AuthorizationService {
  constructor(
    @Inject(UsuarioService)
    private readonly usuarioService: UsuarioService,
  ) {}
  async verificaTipoDoUsuario(
    idUsuario: number,
    tipoGrupo: Tipo,
  ): Promise<boolean> {
    const user = await this.usuarioService.findOne(idUsuario);
    return user.tipoUsuario === tipoGrupo;
  }
}

class NestCriarNovoSlotDeAgenda extends CriarNovoSlotDeAgenda {
  constructor(
    @InjectRepository(SlotAgendaDbEntity)
    agendaService,
    @Inject(MomentDateTimeUtils)
    dateTimeUtils: DateTimeUtils,
    @Inject(NestAuthorizationService)
    authorizationService: AuthorizationService,
  ) {
    super(agendaService, dateTimeUtils, authorizationService);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([SlotAgendaDbEntity]), UsuarioModule],
  controllers: [AgendaController],
  providers: [
    AgendaService,
    NestCriarNovoSlotDeAgenda,
    MomentDateTimeUtils,
    NestAuthorizationService,
  ],
})
export class AgendaModule {}
