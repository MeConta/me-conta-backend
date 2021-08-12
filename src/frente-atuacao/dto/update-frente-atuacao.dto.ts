import { PartialType } from '@nestjs/mapped-types';
import { CreateFrenteAtuacaoDto } from './create-frente-atuacao.dto';

export class UpdateFrenteAtuacaoDto extends PartialType(CreateFrenteAtuacaoDto) {}
