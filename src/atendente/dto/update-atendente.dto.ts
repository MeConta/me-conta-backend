import { PartialType } from '@nestjs/mapped-types';
import { CreateAtendenteDto } from './create-atendente.dto';

export class UpdateAtendenteDto extends PartialType(CreateAtendenteDto) {}
