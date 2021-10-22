import { Inject, Injectable, Module } from '@nestjs/common';
import { CadastrarAluno } from '../_business/alunos/casos-de-uso/cadastrar-aluno.feat';
import { CadastroAlunoController } from './controllers/cadastro-aluno.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioDbEntity } from '../_adapters/usuarios/entidades/usuario.db.entity';
import { PerfilDbEntity } from '../_adapters/perfil/entidades/perfil.db.entity';
import { ICadastrarNovoAlunoService } from '../_business/alunos/services/alunos.service';
import { IBuscarUsuarioViaId } from '../_business/usuarios/casos-de-uso/buscar-usuario.id.feat';
import { ICadastrarPerfilService } from '../_business/perfil/services/cadastrar-perfil.service';
import { TypeormUsuarioService } from '../_adapters/usuarios/services/typeorm-usuario.service';
import { TypeormPerfilService } from '../_adapters/perfil/services/typeorm-perfil.service';
import { AlunoDbEntity } from '../_adapters/alunos/entidades/aluno.db.entity';
import { TypeormAlunoService } from '../_adapters/alunos/services/typeorm-aluno.service';

@Injectable()
class NestCadastrarAluno extends CadastrarAluno {
  constructor(
    @Inject(TypeormUsuarioService)
    usuarioService: IBuscarUsuarioViaId,
    @Inject(TypeormPerfilService)
    perfilService: ICadastrarPerfilService,
    @Inject(TypeormAlunoService)
    alunoService: ICadastrarNovoAlunoService,
  ) {
    super(usuarioService, perfilService, alunoService);
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioDbEntity, PerfilDbEntity, AlunoDbEntity]),
  ],
  providers: [
    TypeormUsuarioService,
    TypeormPerfilService,
    TypeormAlunoService,
    {
      provide: CadastrarAluno,
      useClass: NestCadastrarAluno,
    },
  ],
  controllers: [CadastroAlunoController],
})
export class AlunoModule {}
