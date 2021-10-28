import { Usuario } from '../../usuarios/entidades/usuario.entity';

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
}

export interface Bio {
  bio?: string;
}
