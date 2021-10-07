import { Perfil } from '../../usuarios/entidades/usuario.entity';
import { IBuscarUsuarioViaId } from '../../usuarios/casos-de-uso/buscar-usuario.id.feat';
import { TipoUsuario } from '../../usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Voluntario } from '../entidades/voluntario.entity';

export type NovoVoluntario = Perfil & Voluntario;

export interface ICadastrarNovoVoluntarioService {
  cadastrar(voluntario: NovoVoluntario): Promise<void>;
}

// ---
export class UsuarioNaoEncontradoError extends Error {
  public code = 404;
  public message = 'Usuário não encontrado';
}

export class UsuarioInvalidoError extends Error {
  public code = 403;
  public message = 'Usuário inválido';
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
  ) {}

  private checkCampos(keys, input) {
    return keys.every((key) => Object.keys(input).includes(key) && input[key]);
  }

  async execute(input: NovoVoluntario) {
    const usuario = await this.usuarioService.findById(input.usuario.id);
    if (!usuario) {
      throw new UsuarioNaoEncontradoError();
    }

    switch (usuario.tipo) {
      case TipoUsuario.ALUNO:
      case TipoUsuario.ADMINISTRADOR:
        throw new UsuarioInvalidoError();
    }

    if (
      !this.checkCampos(
        input.formado ? ['anoFormacao', 'crp', 'areaAtuacao'] : ['semestre'],
        input,
      )
    ) {
      throw new CamposDeFormacaoError();
    }
    await this.voluntarioService.cadastrar(input);
  }
}
