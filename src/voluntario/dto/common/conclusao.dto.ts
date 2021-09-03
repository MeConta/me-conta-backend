import { IsNotEmpty, Length, ValidateIf } from 'class-validator';

export class ConclusaoDto {
  @Length(4, 4)
  anoConclusao: number;

  @ValidateIf((dto: ConclusaoDto) => dto.anoConclusao != null, {
    always: true,
  })
  @IsNotEmpty()
  especializacao: string;

  @ValidateIf((dto: ConclusaoDto) => dto.anoConclusao != null, {
    always: true,
  })
  @IsNotEmpty()
  crp: string;
}
