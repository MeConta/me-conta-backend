import { Inject, Injectable, Module } from '@nestjs/common';
import { CadastroInicialController } from './controllers/cadastro-inicial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioDbEntity } from '../../_adapters/usuarios/entidades/usuario.db.entity';
import { TypeormUsuarioService } from '../../_adapters/usuarios/services/typeorm-usuario.service';
import {
  CadastrarNovoUsuario,
  ICadastrarNovoUsuario,
} from '../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import {
  IHashGenerateSaltService,
  IHashHashService,
} from '../../_business/usuarios/services/hash.service';
import { BcryptHashService } from '../../_adapters/usuarios/services/bcrypt-hash.service';

@Injectable()
class NestCadastrarNovoUsuario extends CadastrarNovoUsuario {
  constructor(
    @Inject(TypeormUsuarioService)
    usuarioService: ICadastrarNovoUsuario,
    @Inject(BcryptHashService)
    passwordService: IHashGenerateSaltService & IHashHashService,
  ) {
    super(usuarioService, passwordService);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioDbEntity])],
  providers: [
    TypeormUsuarioService,
    BcryptHashService,
    {
      provide: CadastrarNovoUsuario,
      useClass: NestCadastrarNovoUsuario,
    },
  ],
  controllers: [CadastroInicialController],
})
export class UsuarioModule {}
