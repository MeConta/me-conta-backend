import { Tipo } from '../../usuario/entities/usuario.enum';

export interface TokenDto {
  token: string;
}
export interface TokenPayload {
  sub: number;
  email: string;
  roles: Tipo[];
}
