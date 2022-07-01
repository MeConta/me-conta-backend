import { IBuscarPerfilByIdService } from 'src/_business/perfil/services/perfil.service';
import { VoluntarioComPerfil } from '../dtos/voluntario.dto';
import { IBuscarVoluntarioViaId } from '../services/voluntario.service';

export class VoluntarioNaoEncontradoError extends Error {
  code = 404;
  message = 'Voluntário não encontrado';
}

export class BuscarVoluntarioViaId {
  constructor(
    private readonly voluntarioService: IBuscarVoluntarioViaId,
    private readonly perfilService: IBuscarPerfilByIdService,
  ) {}

  async execute(id: number): Promise<VoluntarioComPerfil> {
    const voluntario = await this.voluntarioService.findById(id);
    const perfil = await this.perfilService.findById(id);
    const voluntariocomperfil = { ...voluntario, ...perfil };
    return voluntariocomperfil;
  }
}
