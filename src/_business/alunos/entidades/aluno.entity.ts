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

export type NovoAluno = Aluno & Perfil;
