import { SetMetadata } from '@nestjs/common';
import { Tipo } from '../../usuario/entities/usuario.enum';

export const Roles = (...roles: Tipo[]) => SetMetadata('roles', roles);
