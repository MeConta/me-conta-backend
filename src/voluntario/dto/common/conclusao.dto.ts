import { IsNotEmpty, IsNumber, Max, Min, ValidateIf } from 'class-validator';

export class ConclusaoDto {
  @IsNotEmpty()
  formado?: boolean;

  /***
   * Validar o anoConclusão caso o atendente/supervisor SEJA formado
   */
  @ValidateIf((dto: ConclusaoDto) => !!dto.formado)
  @IsNumber()
  anoConclusao?: number;

  /***
   * Validar a especialização caso o atendente/supervisor SEJA formado
   */
  @ValidateIf((dto: ConclusaoDto) => !!dto.formado)
  @IsNotEmpty()
  especializacao?: string;

  /***
   * Validar o CRP caso o atendente/supervisor SEJA formado
   */
  @ValidateIf((dto: ConclusaoDto) => !!dto.formado)
  @IsNotEmpty()
  crp?: string;

  /***
   * Validar o semestre caso o atendente NÃO seja formado
   */
  @ValidateIf((dto: ConclusaoDto) => !!!dto.formado)
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  semestre?: number;
}
