import { Perfil } from '../../usuarios/entidades/usuario.entity';

export enum Escolaridade {
  PRIMEIRO_ANO,
  SEGUNDO_ANO,
  TERCEIRO_ANO,
  CURSINHO,
  EJA,
  SUPLETIVO,
}

export enum TipoEscola {
  PUBLICA,
  PARTICULAR,
}

export interface Aluno {
  escolaridade: Escolaridade;
  tipoEscola: TipoEscola;
}

export interface Motivos {
  necessidades?: string;
  expectativas?: string;
  tratamentos?: string;
}

export type NovoAluno = Aluno & Perfil & Motivos;
