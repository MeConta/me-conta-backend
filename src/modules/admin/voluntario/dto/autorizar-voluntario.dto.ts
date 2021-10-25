import { AutorizarVoluntarioInput } from '../../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class AutorizarVoluntarioInputDto implements AutorizarVoluntarioInput {
  @IsBoolean({
    message: '$property deve ser um valor booleano',
  })
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  aprovado: boolean;
}
