import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioDto } from '../../../src/_adapters/usuarios/dto/create-usuario.dto';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {}
