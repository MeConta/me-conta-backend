import { PartialType } from '@nestjs/swagger';
import { CreateFrenteAtuacaoDto } from './create-frente-atuacao.dto';

export class UpdateFrenteAtuacaoDto extends PartialType(
  CreateFrenteAtuacaoDto,
) {}
