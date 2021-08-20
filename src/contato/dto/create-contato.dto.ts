import { IsEmail, IsNotEmpty } from 'class-validator';
import { IContact } from '../../mail/templates/contact.interface';

export class CreateContatoDto implements IContact {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  mensagem: string;
}
