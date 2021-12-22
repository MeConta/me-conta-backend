import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';
import { Aluno } from '../../alunos/entidades/aluno.entity';
import { Usuario } from '../../usuarios/entidades/usuario.entity';

export enum StatusAtendimento {
  ABERTO,
  REALIZADO,
}

export interface Atendimento {
  id: number;
  voluntario: Promise<Voluntario>;
  aluno: Promise<Aluno & Usuario>;
  data: Date;
  status: StatusAtendimento;
}

export type NovoAtendimento = Atendimento;
