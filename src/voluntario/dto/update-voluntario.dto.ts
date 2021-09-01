import { IsNotEmpty } from 'class-validator';

export class UpdateVoluntarioDto {
  @IsNotEmpty()
  aprovado: boolean;
}
