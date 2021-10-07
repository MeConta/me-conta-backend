import { Perfil, Usuario } from '../entidades/usuario.entity';
import { IBuscarUsuarioViaId } from './buscar-usuario.id.feat';
import { TipoUsuario } from './cadastrar-novo-usuario.feat';

export enum FrenteAtuacao {
  SESSAO_ACOLHIMENTO,
  COACHING_DE_ROTINA_DE_ESTUDOS,
  ORIENTACAO_VOCACIONAL,
}

export interface Voluntario {
  instituicao: string;
  formado: boolean;
  frentes: FrenteAtuacao[];
  aprovado?: boolean;
  semestre?: number;
  anoFormacao?: number;
  crp?: string;
  usuario: Usuario;
}

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

// ---
export class CadastrarVoluntario {
  constructor(
    private readonly voluntarioService: ICadastrarNovoVoluntarioService,
    private readonly usuarioService: IBuscarUsuarioViaId,
  ) {}

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
    await this.voluntarioService.cadastrar(input);
  }
}
