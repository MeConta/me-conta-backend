import { IsNotEmpty, IsNumber, Max, Min, ValidateIf } from 'class-validator';

export class ConclusaoDto {
  @IsNotEmpty()
  formado?: boolean;

  /***
   * Validar o anoConclusão caso o atendente/supervisor SEJA formado
   */
  @ValidateIf((dto: ConclusaoDto) => dto.formado === true)
  @IsNumber()
  anoConclusao?: number;

  /***
   * Validar a especialização caso o atendente/supervisor SEJA formado
   */
  @ValidateIf((dto: ConclusaoDto) => dto.formado === true)
  @IsNotEmpty()
  especializacao?: string;

  /***
   * Validar o CRP caso o atendente/supervisor SEJA formado
   */
  @ValidateIf((dto: ConclusaoDto) => dto.formado === true)
  @IsNotEmpty()
  crp?: string;

  /***
   * Validar o semestre caso o atendente NÃO seja formado
   */
  @ValidateIf((dto: ConclusaoDto) => dto.formado === false)
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  semestre?: number;
}
