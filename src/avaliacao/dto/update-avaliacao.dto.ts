import { PartialType } from '@nestjs/mapped-types';
import { CreateAvaliacaoDto } from './create-avaliacao.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateAvaliacaoDto extends PartialType(CreateAvaliacaoDto) {
  @IsNotEmpty()
  aprovado: boolean;
}
