import { Inject, Injectable, Module } from '@nestjs/common';
import {
  CadastrarVoluntario,
  ICadastrarNovoVoluntarioService,
} from '../_business/voluntarios/casos-de-uso/cadastrar-voluntario.feat';
import { IBuscarUsuarioViaId } from '../_business/usuarios/casos-de-uso/buscar-usuario.id.feat';
import { TypeormUsuarioService } from '../_adapters/usuarios/services/typeorm-usuario.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoluntarioDbEntity } from '../_adapters/voluntarios/entidades/voluntario-db.entity';
import { UsuarioDbEntity } from '../_adapters/usuarios/entidades/usuario.db.entity';
import { CadastroVoluntarioController } from './cadastro-voluntario.controller';
import { TypeormPerfilService } from '../_adapters/perfil/services/typeorm-perfil.service';
import { ICadastrarPerfilService } from '../_business/perfil/services/cadastrar-perfil.service';
import { PerfilDbEntity } from '../_adapters/perfil/entidades/perfil.db.entity';
import { TypeormVoluntarioService } from '../_adapters/voluntarios/services/typeorm-voluntario.service';
import { IAtualizarUsuarioService } from '../_business/usuarios/services/usuario.service';

@Injectable()
class NestCadastrarVoluntario extends CadastrarVoluntario {
  constructor(
    @Inject(TypeormUsuarioService)
    usuarioService: IBuscarUsuarioViaId & IAtualizarUsuarioService,
    @Inject(TypeormVoluntarioService)
    voluntarioService: ICadastrarNovoVoluntarioService,
    @Inject(TypeormPerfilService)
    perfilService: ICadastrarPerfilService,
  ) {
    super(voluntarioService, usuarioService, perfilService);
  }
}
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsuarioDbEntity,
      PerfilDbEntity,
      VoluntarioDbEntity,
    ]),
  ],
  providers: [
    TypeormUsuarioService,
    TypeormPerfilService,
    TypeormVoluntarioService,
    {
      provide: CadastrarVoluntario,
      useClass: NestCadastrarVoluntario,
    },
  ],
  controllers: [CadastroVoluntarioController],
})
export class CadastroVoluntarioModule {}
