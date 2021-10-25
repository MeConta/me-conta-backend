import { Perfil } from '../../usuarios/entidades/usuario.entity';
import { IBuscarUsuarioViaId } from '../../usuarios/casos-de-uso/buscar-usuario.id.feat';
import {
  NovoUsuario,
  TipoUsuario,
} from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Bio, Voluntario } from '../entidades/voluntario.entity';
import { ICadastrarPerfilService } from '../../perfil/services/cadastrar-perfil.service';
import {
  UsuarioInvalidoError,
  UsuarioNaoEncontradoError,
} from '../../usuarios/erros/usuarios.errors';
import { IAtualizarUsuarioService } from '../../usuarios/services/usuario.service';

export type NovoVoluntario = Perfil &
  Omit<Voluntario, 'aprovado'> &
  Bio &
  Partial<Pick<NovoUsuario, 'tipo'>>;

export interface ICadastrarNovoVoluntarioService {
  cadastrar(voluntario: NovoVoluntario): Promise<void>;
}

export class CamposDeFormacaoError extends Error {
  public code = 422;
  public message = 'Usuário deve informar os campos relativos à formação';
}

// ---
export class CadastrarVoluntario {
  constructor(
    private readonly voluntarioService: ICadastrarNovoVoluntarioService,
    private readonly usuarioService: IBuscarUsuarioViaId &
      IAtualizarUsuarioService,
    private readonly perfilService: ICadastrarPerfilService,
  ) {}

  private checkCampos(keys: string[], input: NovoVoluntario) {
    return keys.every((key) => Object.keys(input).includes(key) && input[key]);
  }

  async execute(input: NovoVoluntario): Promise<void> {
    /***
     * Verificação de existência do usuário
     */
    const usuario = await this.usuarioService.findById(input.usuario.id);
    if (!usuario) {
      throw new UsuarioNaoEncontradoError();
    }

    /***
     * Verificação de tipo de usuário:
     *  Alunos e administradores não podem fazer cadastro de voluntário
     * */
    switch (usuario.tipo) {
      case TipoUsuario.ALUNO:
      case TipoUsuario.ADMINISTRADOR:
        throw new UsuarioInvalidoError();
    }

    /***
     * Tipo de Usuário e formação
     */
    const { tipo } = input;

    /***
     * Supervisores devem NECESSARIAMENTE serem formados
     */
    if (tipo === TipoUsuario.SUPERVISOR) {
      input.formado = true;
    }

    /***
     * Formação:
     * - Voluntários formados devem preencher os campos ['anoFormacao', 'crp', 'areaAtuacao']
     * - Voluntários em formação devem preencher os campos ['semestre']
     */
    const campos: string[] = input.formado
      ? ['anoFormacao', 'crp', 'areaAtuacao']
      : ['semestre'];
    if (!this.checkCampos(campos, input)) {
      throw new CamposDeFormacaoError();
    }
    /***
     * Garantir que os outros campos não sejam preenchidos, a depender da formação
     */
    if (input.formado) {
      input = {
        ...input,
        semestre: null,
      };
    } else {
      input = {
        ...input,
        anoFormacao: null,
        crp: null,
        areaAtuacao: null,
      };
    }

    /***
     * Tipo de Usuário:
     * Se necessário, trocar o tipo de usuário antes do cadastro
     * Só vale para os tipos de usuário de voluntários
     */
    if (
      [TipoUsuario.SUPERVISOR, TipoUsuario.ATENDENTE].includes(tipo) &&
      tipo !== usuario.tipo
    ) {
      await this.usuarioService.atualizar(usuario.id, {
        tipo,
      });
    }

    /***
     * Cadastrar o perfil
     */
    await this.perfilService.cadastrar(input);
    /***
     * Cadastrar o voluntário
     */
    await this.voluntarioService.cadastrar(input);
  }
}
