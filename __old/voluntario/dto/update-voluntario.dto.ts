import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateVoluntarioDto } from './create-voluntario.dto';

export class UpdateVoluntarioDto extends PartialType(CreateVoluntarioDto) {
  @IsOptional()
  @IsNotEmpty()
  aprovado: boolean;
}
