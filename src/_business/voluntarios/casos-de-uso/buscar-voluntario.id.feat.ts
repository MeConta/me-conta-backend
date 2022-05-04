import { Voluntario } from '../entidades/voluntario.entity';
import { IBuscarVoluntarioViaId } from '../services/voluntario.service';

export class VoluntarioNaoEncontradoError extends Error {
  code = 404;
  message = 'Voluntário não encontrado';
}

export class BuscarVoluntarioViaId {
  constructor(private readonly voluntarioService: IBuscarVoluntarioViaId) {}

  async execute(id: number): Promise<Voluntario> {
    const voluntario = await this.voluntarioService.findById(id);

    // if (!voluntario) {
    //   throw new VoluntarioNaoEncontradoError();
    // }

    return voluntario;
  }
}
