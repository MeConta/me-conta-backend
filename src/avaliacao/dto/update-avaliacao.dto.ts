import { PartialType } from '@nestjs/mapped-types';
import { CreateAvaliacaoDto } from './create-avaliacao.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateAvaliacaoDto extends PartialType(CreateAvaliacaoDto) {
  @IsOptional()
  @IsNotEmpty()
  aprovado: boolean;
}
