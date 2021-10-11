import { Perfil } from '../../usuarios/entidades/usuario.entity';
import { ICadastrarPerfilService } from '../../perfil/interfaces/cadastrar-perfil.service';
import { NovoAluno } from '../entidades/aluno.entity';
import { ICadastrarNovoAlunoService } from '../services/alunos.service';
import { IBuscarUsuarioViaId } from '../../usuarios/casos-de-uso/buscar-usuario.id.feat';
import {
  UsuarioInvalidoError,
  UsuarioNaoEncontradoError,
} from '../../usuarios/erros/erros';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

export class CadastrarAluno {
  constructor(
    private readonly usuarioService: IBuscarUsuarioViaId,
    private readonly perfilService: ICadastrarPerfilService,
    private readonly alunoService: ICadastrarNovoAlunoService,
  ) {}

  async execute(input: NovoAluno & Perfil): Promise<void> {
    /***
     * Verificação de existência do usuário
     */
    const usuario = await this.usuarioService.findById(input.usuario.id);
    if (!usuario) {
      throw new UsuarioNaoEncontradoError();
    }
    /***
     * Verificação de tipo de usuário:
     *  Deve ser Aluno
     * */
    if (usuario.tipo !== TipoUsuario.ALUNO) {
      throw new UsuarioInvalidoError();
    }
    await this.perfilService.cadastrar(input);
    await this.alunoService.cadastrar(input);
  }
}
