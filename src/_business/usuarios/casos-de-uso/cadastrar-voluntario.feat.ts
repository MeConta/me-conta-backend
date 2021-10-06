import { Perfil, Usuario } from '../entidades/usuario.entity';
import { IBuscarUsuarioViaId } from './buscar-usuario.id.feat';

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

// ---
export class CadastrarVoluntario {
  constructor(
    private readonly voluntarioService: ICadastrarNovoVoluntarioService,
    private readonly usuarioService: IBuscarUsuarioViaId,
  ) {}

  async execute(input: NovoVoluntario) {
    if (!(await this.usuarioService.findById(input.usuario.id))) {
      throw new UsuarioNaoEncontradoError();
    }
    await this.voluntarioService.cadastrar(input);
  }
}
