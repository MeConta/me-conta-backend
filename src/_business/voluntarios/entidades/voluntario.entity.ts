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

export interface Voluntario {
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
}

export interface Bio {
  bio?: string;
}

export interface Abordagem {
  abordagem?: string;
}
