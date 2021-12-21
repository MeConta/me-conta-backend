import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';
import { Aluno } from '../../alunos/entidades/aluno.entity';

export enum StatusAtendimento {
  ABERTO,
  REALIZADO,
}

export interface Atendimento {
  id: number;
  voluntario: Promise<Voluntario>;
  aluno: Promise<Aluno>;
  data: Date;
  status: StatusAtendimento;
}

export type NovoAtendimento = Atendimento;
