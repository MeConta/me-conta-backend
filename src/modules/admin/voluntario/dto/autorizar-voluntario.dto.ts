import { AutorizarVoluntarioInput } from '../../../../_business/admin/casos-de-uso/autorizar-voluntario.feat';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUrl,
  ValidateIf,
} from 'class-validator';

export class AutorizarVoluntarioInputDto implements AutorizarVoluntarioInput {
  @IsBoolean({
    message: '$property deve ser um valor booleano',
  })
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  aprovado: boolean;

  @IsString({ message: '$property deve ser uma url válida!' })
  @IsUrl()
  @ValidateIf(
    (autorizarVoluntarioObject) => autorizarVoluntarioObject.aprovado === true,
  )
  link?: string;
}
