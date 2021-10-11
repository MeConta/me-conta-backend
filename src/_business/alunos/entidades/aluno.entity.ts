import { Perfil } from '../../usuarios/entidades/usuario.entity';

export enum Escolaridade {
  PRIMEIRO_ANO = 'PRIMEIRO_ANO',
  SEGUNDO_ANO = 'SEGUNDO_ANO',
  TERCEIRO_ANO = 'TERCEIRO_ANO',
  CURSINHO = 'CURSINHO',
  EJA = 'EJA',
  SUPLETIVO = 'SUPLETIVO',
}

export enum TipoEscola {
  PUBLICA = 'PUBLICA',
  PARTICULAR = 'PARTICULAR',
}

export interface Aluno {
  escolaridade: Escolaridade;
  tipoEscola: TipoEscola;
}

export type NovoAluno = Aluno & Perfil;
