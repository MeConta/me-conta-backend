import {
  Estado,
  Genero,
} from '../../../../__old/usuario/entities/usuario.enum';
import { TipoUsuario } from '../casos-de-uso/cadastrar-novo-usuario.feat';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  salt: string;
  dataNascimento?: Date;
  genero?: Genero;
  UF?: Estado;
  cidade?: string;
  telefone?: string;
  tipoUsuario?: TipoUsuario;
  dataTermos: Date;
}
