import { Usuario } from '../../usuarios/entidades/usuario.entity';
import { SlotAgenda } from '../../agenda/entidades/slot-agenda.entity';

export enum FrenteAtuacao {
  SESSAO_ACOLHIMENTO,
  COACHING_DE_ROTINA_DE_ESTUDOS,
  ORIENTACAO_VOCACIONAL,
}

export enum AreaAtuacao {
  PROFESSOR = 'professor',
  PSICOLOGO = 'psicologo',
}

export enum StatusAprovacao {
  REPROVADO = 1,
  APROVADO = 2,
  ABERTO = 3,
}

export interface Voluntario {
  id?: number;
  instituicao: string;
  formado: boolean;
  frentes?: FrenteAtuacao[];
  aprovado?: boolean;
  semestre?: number;
  anoFormacao?: number;
  crp?: string;
  areaAtuacao?: AreaAtuacao;
  especializacoes?: string;
  usuario: Usuario;
  slots?: SlotAgenda[];
  link?: string;
}

export interface Bio {
  bio?: string;
}

export interface Abordagem {
  abordagem?: string;
}
