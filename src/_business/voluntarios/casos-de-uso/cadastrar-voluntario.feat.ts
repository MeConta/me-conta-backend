import { Perfil } from '../../usuarios/entidades/usuario.entity';
import { IBuscarUsuarioViaId } from '../../usuarios/casos-de-uso/buscar-usuario.id.feat';
import {
  NovoUsuario,
  TipoUsuario,
} from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Abordagem, Bio, Voluntario } from '../entidades/voluntario.entity';
import {
  UsuarioInvalidoError,
  UsuarioNaoEncontradoError,
} from '../../usuarios/erros/usuarios.errors';
import { IAtualizarUsuarioService } from '../../usuarios/services/usuario.service';
import { ICadastrarPerfilService } from '../../perfil/services/perfil.service';

export type NovoVoluntario = Perfil &
  Omit<Voluntario, 'aprovado' | 'slots'> &
  Bio &
  Abordagem &
  Partial<Pick<NovoUsuario, 'tipo'>>;

export interface ICadastrarNovoVoluntarioService {
  cadastrar(voluntario: NovoVoluntario): Promise<void>;
}

export class CamposDeFormacaoError extends Error {
  constructor(private readonly fields: string[]) {
    super();
  }
  public code = 422;
  public message = 'Usuário deve informar os campos relativos à formação';
  public context = this.fields.map((campo) => `${campo} deve ser informado`);
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
    const { tipo } = {
      tipo: input.tipo || usuario.tipo,
    };

    /***
     * Supervisores:
     * - Devem NECESSARIAMENTE serem formados
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
      /***
       * Deve constar quais campos estão faltando no context do erro
       */
      throw new CamposDeFormacaoError(
        campos.filter((campo) => !!!input[campo]),
      );
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
     * Outros tipos são ignorados
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
