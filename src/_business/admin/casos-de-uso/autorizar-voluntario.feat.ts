import {
  IAtualizarAprovacaoVoluntario,
  IBuscarVoluntarioViaId,
} from '../../voluntarios/services/voluntario.service';
import { Voluntario } from '../../voluntarios/entidades/voluntario.entity';

export type AutorizarVoluntarioInput = Pick<Voluntario, 'aprovado'>;

export class VoluntarioNaoEncontradoError extends Error {
  code = 404;
  message = 'Voluntário não encontrado';
}

export class AutorizarVoluntario {
  constructor(
    private readonly service: IBuscarVoluntarioViaId &
      IAtualizarAprovacaoVoluntario,
  ) {}

  async execute(id: number, status: boolean): Promise<void> {
    if (!(await this.service.findById(id))) {
      throw new VoluntarioNaoEncontradoError();
    }
    await this.service.atualizarAprovacao(id, status);
  }
}
