import { NovoAtendimento } from '../../../_business/atendimentos/entidades/atendimentos.entity';
import { Aluno } from '../../../_business/alunos/entidades/aluno.entity';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { SlotAgenda } from '../../../_business/agenda/entidades/slot-agenda.entity';

export class CreateAtendimentoDto implements NovoAtendimento {
  /***
   * SlotAgenda associado ao atendimento
   * @Type SlotAgenda
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  slotAgenda: Promise<SlotAgenda>;

  /***
   * Aluno associado ao atendimento
   * @Type Aluno
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  aluno: Promise<Aluno & Usuario>;

  @Type(() => Date)
  dataCriacao: Date;

  /***
   * Anotações sobre o atendimento
   * @Type string
   */
  @IsOptional()
  anotacoes: string;
}
