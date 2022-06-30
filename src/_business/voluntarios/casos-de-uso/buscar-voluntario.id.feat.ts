import { IBuscarPerfilByIdService } from 'src/_business/perfil/services/perfil.service';
import { Perfil } from 'src/_business/usuarios/entidades/usuario.entity';
import { Voluntario } from '../entidades/voluntario.entity';
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

  async execute(id: number): Promise<Voluntario & Perfil> {
    const voluntario = await this.voluntarioService.findById(id);
    const perfil = await this.perfilService.findById(id);
    const voluntariocomperfil = { ...perfil, ...voluntario };
    // if (!voluntario) {
    //   throw new VoluntarioNaoEncontradoError();
    //  }
    return voluntariocomperfil;
  }
}
