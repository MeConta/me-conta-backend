import { NovoAtendimento } from '../../../_business/atendimentos/entidades/atendimentos.entity';
import { Aluno } from '../../../_business/alunos/entidades/aluno.entity';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { Voluntario } from '../../../_business/voluntarios/entidades/voluntario.entity';
import { IsDate, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAtendimentoDto implements NovoAtendimento {
  /***
   * Voluntario associado ao atendimento
   * @Type Voluntario
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  voluntario: Promise<Voluntario>;

  /***
   * Aluno associado ao atendimento
   * @Type Aluno
   */
  @IsNotEmpty({
    message: '$property não deve ser vazio',
  })
  aluno: Promise<Aluno & Usuario>;

  @IsDate({
    message: '$property deve ser uma data',
  })
  @Type(() => Date)
  dataCriacao: Date;

  /***
   * Anotações sobre o atendimento
   * @Type string
   */
  anotacoes: string;
}
