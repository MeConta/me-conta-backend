import { Aluno } from '../../alunos/entidades/aluno.entity';
import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { SlotAgenda } from '../../agenda/entidades/slot-agenda.entity';

export enum StatusAtendimento {
  ABERTO,
  REALIZADO,
}

export interface Atendimento {
  id: number;
  aluno: Promise<Aluno & Usuario>;
  slotAgenda: Promise<SlotAgenda>;
  status: StatusAtendimento;
  anotacoes: string;
  dataCriacao: Date;
}

export type NovoAtendimento = Omit<Atendimento, 'id' | 'status'>;
