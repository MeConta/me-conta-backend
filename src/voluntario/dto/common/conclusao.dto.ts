import { IsNotEmpty, IsNumber, IsOptional, ValidateIf } from 'class-validator';

export class ConclusaoDto {
  @IsOptional()
  @IsNumber()
  anoConclusao: number;

  @ValidateIf((dto: ConclusaoDto) => !!dto.anoConclusao)
  @IsNotEmpty()
  especializacao: string;

  @ValidateIf((dto: ConclusaoDto) => !!dto.anoConclusao)
  @IsNotEmpty()
  crp: string;
}
