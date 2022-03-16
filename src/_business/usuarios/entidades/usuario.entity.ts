import { TipoUsuario } from '../casos-de-uso/cadastrar-novo-usuario.feat';

export enum Genero {
  MASCULINO = 'M',
  FEMININO = 'F',
  NAO_BINARIO = 'NB',
  PREFIRO_NAO_DECLARAR = 'ND',
}

export enum Estado {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO',
  DF = 'DF',
}

export interface Perfil {
  telefone?: string;
  dataNascimento?: Date;
  cidade?: string;
  UF?: Estado;
  genero?: Genero;
  usuario: Usuario;
}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  salt: string;
  tipo: TipoUsuario;
  dataTermos: Date;
  refreshTokenHashed?: string;
}
