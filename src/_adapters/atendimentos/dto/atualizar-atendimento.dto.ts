import {
  Atendimento,
  StatusAtendimento,
} from '../../../_business/atendimentos/entidades/atendimentos.entity';
import { IsEnum } from 'class-validator';

export class AtualizarAtendimentoDto implements Pick<Atendimento, 'status'> {
  /***
   * Status o atendimento
   * @Type StatusAtendimento
   */
  @IsEnum(StatusAtendimento, {
    message: '$property deve ser um valor de enum válido',
  })
  status: StatusAtendimento;
}
