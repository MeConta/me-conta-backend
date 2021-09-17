import { IsNotEmpty } from 'class-validator';

export class CreateFrenteAtuacaoDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  descricao: string;
}
