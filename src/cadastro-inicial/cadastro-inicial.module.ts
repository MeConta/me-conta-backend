import { Inject, Injectable, Module } from '@nestjs/common';
import { CadastroInicialController } from './cadastro-inicial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioDbEntity } from '../_adapters/usuarios/entidades/usuario.db.entity';
import { TypeormUsuarioService } from '../_adapters/usuarios/typeorm-usuario.service';
import {
  CadastrarNovoUsuario,
  ICadastrarNovoUsuario,
} from '../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { IHashService } from '../_business/interfaces/hash.service';
import { IPasswordStrengthService } from '../_business/interfaces/password-strength.service';
import { PasswordService } from '../_adapters/password.service';

@Injectable()
class NestCadastrarNovoUsuario extends CadastrarNovoUsuario {
  constructor(
    @Inject(TypeormUsuarioService)
    usuarioService: ICadastrarNovoUsuario,
    @Inject(PasswordService)
    passwordService: IHashService & IPasswordStrengthService,
  ) {
    super(usuarioService, passwordService);
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioDbEntity])],
  providers: [
    TypeormUsuarioService,
    PasswordService,
    {
      provide: CadastrarNovoUsuario,
      useClass: NestCadastrarNovoUsuario,
    },
  ],
  controllers: [CadastroInicialController],
})
export class CadastroInicialModule {}
