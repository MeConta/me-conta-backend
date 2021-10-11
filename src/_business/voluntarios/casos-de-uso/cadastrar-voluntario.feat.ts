import { Perfil } from '../../usuarios/entidades/usuario.entity';
import { IBuscarUsuarioViaId } from '../../usuarios/casos-de-uso/buscar-usuario.id.feat';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Voluntario } from '../entidades/voluntario.entity';
import { ICadastrarPerfilService } from '../../perfil/interfaces/cadastrar-perfil.service';
import {
  UsuarioInvalidoError,
  UsuarioNaoEncontradoError,
} from '../../usuarios/erros/erros';

export type NovoVoluntario = Perfil & Voluntario;

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
    private readonly usuarioService: IBuscarUsuarioViaId,
    private readonly perfilService: ICadastrarPerfilService,
  ) {}

  private checkCampos(keys, input) {
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
     * Cadastrar o perfil
     */
    await this.perfilService.cadastrar(input);
    /***
     * Cadastrar o voluntário
     */
    await this.voluntarioService.cadastrar(input);
  }
}
