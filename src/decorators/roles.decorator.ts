import { SetMetadata } from '@nestjs/common';
import { Tipo } from '../../__old/usuario/entities/usuario.enum';

export const Roles = (...roles: Tipo[]) => SetMetadata('roles', roles);
