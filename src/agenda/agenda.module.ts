import { Inject, Module } from '@nestjs/common';
import { AgendaController } from './agenda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotAgendaDbEntity } from '../_adapters/agenda/entidades/slot-agenda.db-entity';
import { CriarNovoSlotDeAgenda } from '../_business/atendente/agendamentos/casos-de-uso/criar-novo-slot-de-agenda.feat';
import { AuthorizationService } from '../_business/autorizacao/interfaces/authorization.service';
import { DateTimeUtils } from '../_business/atendente/agendamentos/interfaces/date-time.utils';
import { MomentDateTimeUtils } from '../_business/atendente/agendamentos/fakes/moment-date-time.utils';
import { TypeOrmAgendaService } from '../_adapters/agenda/typeorm-agenda.service';
import { TipoUsuario } from '../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { TypeormUsuarioService } from '../_adapters/usuarios/typeorm-usuario.service';
import { IBuscarUsuarioViaId } from '../_business/usuarios/casos-de-uso/buscar-usuario.id.feat';
import { UsuarioDbEntity } from '../_adapters/usuarios/entidades/usuario.db.entity';

// TODO: Criar testes.
class NestAuthorizationService implements AuthorizationService {
  @Inject(TypeormUsuarioService)
  private readonly usuarioService: IBuscarUsuarioViaId;
  async verificaTipoDoUsuario(
    idUsuario: number,
    tipoGrupo: TipoUsuario,
  ): Promise<boolean> {
    const user = await this.usuarioService.findById(idUsuario);
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
  imports: [TypeOrmModule.forFeature([SlotAgendaDbEntity, UsuarioDbEntity])],
  controllers: [AgendaController],
  providers: [
    {
      provide: CriarNovoSlotDeAgenda,
      useClass: NestCriarNovoSlotDeAgenda,
    },
    TypeormUsuarioService,
    TypeOrmAgendaService,
    MomentDateTimeUtils,
    NestAuthorizationService,
  ],
})
export class AgendaModule {}
