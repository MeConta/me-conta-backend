import { Inject, Module } from '@nestjs/common';
import { AgendaController } from './agenda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlotAgendaDbEntity } from '../_adapters/agenda/entidades/slot-agenda.db-entity';
import { CriarNovoSlotDeAgenda } from '../_business/agenda/casos-de-uso/criar-novo-slot-de-agenda.feat';
import { IAuthorizationService } from '../_business/autorizacao/interfaces/authorization.service';
import { DateTimeService } from '../_business/agenda/interfaces/date-time.service';
import { MomentDateTimeService } from '../_adapters/agenda/services/moment-date-time.service';
import { TypeOrmAgendaService } from '../_adapters/agenda/typeorm-agenda.service';
import { TipoUsuario } from '../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { TypeormUsuarioService } from '../_adapters/usuarios/services/typeorm-usuario.service';
import { IBuscarUsuarioViaId } from '../_business/usuarios/casos-de-uso/buscar-usuario.id.feat';
import { UsuarioDbEntity } from '../_adapters/usuarios/entidades/usuario.db.entity';

// TODO: Criar testes.
class NestAuthorizationService implements IAuthorizationService {
  @Inject(TypeormUsuarioService)
  private readonly usuarioService: IBuscarUsuarioViaId;
  async verificaTipoDoUsuario(
    idUsuario: number,
    tipoGrupo: TipoUsuario,
  ): Promise<boolean> {
    const user = await this.usuarioService.findById(idUsuario);
    return user.tipo === tipoGrupo;
  }
}

class NestCriarNovoSlotDeAgenda extends CriarNovoSlotDeAgenda {
  constructor(
    @Inject(TypeOrmAgendaService)
    agendaService: TypeOrmAgendaService,
    @Inject(MomentDateTimeService)
    dateTimeUtils: DateTimeService,
    @Inject(NestAuthorizationService)
    authorizationService: IAuthorizationService,
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
    MomentDateTimeService,
    NestAuthorizationService,
  ],
})
export class AgendaModule {}
