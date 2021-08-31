import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFrenteAtuacaoDto {
  @ApiProperty({
    example: 'Nome da frente de atuação',
  })
  @IsNotEmpty()
  nome: string;

  @ApiProperty()
  @IsNotEmpty()
  descricao: string;
}
