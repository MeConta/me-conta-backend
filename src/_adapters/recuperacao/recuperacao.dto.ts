import { IsEmail } from 'class-validator';

export class RecuperacaoDto {
  @IsEmail({}, { message: '$property deve ser um e-mail válido' })
  email: string;
}
