import { Usuario } from '../../usuarios/entidades/usuario.entity';

export interface Recuperacao {
  usuario: Usuario;
  hash: string;
  dataExpiracao: Date;
}
