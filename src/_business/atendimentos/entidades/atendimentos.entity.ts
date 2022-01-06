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
  status: StatusAtendimento;
  anotacoes: string;
  dataCriacao: Date;
}

export type NovoAtendimento = Omit<Atendimento, 'id' | 'status'>;
