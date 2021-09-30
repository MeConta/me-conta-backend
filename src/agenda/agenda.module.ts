import { Inject, Module } from '@nestjs/common';
import { AgendaController } from './agenda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotAgendaDbEntity } from '../_adapters/agenda/entidades/slot-agenda.db-entity';
import { CriarNovoSlotDeAgenda } from '../_business/atendente/agendamentos/casos-de-uso/criar-novo-slot-de-agenda.feat';
import { AuthorizationService } from '../_business/autorizacao/interfaces/authorization.service';
import { DateTimeUtils } from '../_business/atendente/agendamentos/interfaces/date-time.utils';
import { MomentDateTimeUtils } from '../_business/atendente/agendamentos/fakes/moment-date-time.utils';
import { Tipo } from '../../__old/usuario/entities/usuario.enum';
import { UsuarioService } from '../../__old/usuario/usuario.service';
import { UsuarioModule } from '../../__old/usuario/usuario.module';
import { TypeOrmAgendaService } from '../_adapters/agenda/typeorm-agenda.service';

// TODO: Criar testes.
class NestAuthorizationService implements AuthorizationService {
  @Inject(UsuarioService)
  private readonly usuarioService: UsuarioService;
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
    @Inject(TypeOrmAgendaService)
    agendaService: TypeOrmAgendaService,
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
    {
      provide: CriarNovoSlotDeAgenda,
      useClass: NestCriarNovoSlotDeAgenda,
    },
    TypeOrmAgendaService,
    MomentDateTimeUtils,
    NestAuthorizationService,
  ],
})
export class AgendaModule {}
