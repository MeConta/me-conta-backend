import { SetMetadata } from '@nestjs/common';
import { TipoUsuario } from '../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

export const Roles = (...roles: TipoUsuario[]) => SetMetadata('roles', roles);
