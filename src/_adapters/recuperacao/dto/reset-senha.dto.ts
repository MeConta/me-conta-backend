import { ResetSenhaInput } from '../../../_business/recuperacao/casos-de-uso/reset-senha.feat';
import { IsNotEmpty } from 'class-validator';
import { IsPasswordStrong } from '../../../decorators';

export class ResetSenhaInputDto implements ResetSenhaInput {
  /***
   * Hash enviada pelo e-mail
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  hash!: string;

  /***
   * Nova Senha
   */
  @IsNotEmpty({
    message: '$property não pode ser vazio',
  })
  @IsPasswordStrong({
    message: '$property deve ser uma senha forte',
  })
  senha!: string;
}
