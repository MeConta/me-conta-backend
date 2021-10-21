import { IBuscarUsuarioViaId } from './buscar-usuario.id.feat';
import { UsuarioNaoEncontradoError } from '../erros/erros';
import {
  IAtualizarUsuario,
  IAtualizarUsuarioService,
  IBuscarUsuarioViaEmailService,
} from '../services/usuario.service';

export class AtualizarUsuario {
  constructor(
    private readonly service: IBuscarUsuarioViaId &
      IBuscarUsuarioViaEmailService &
      IAtualizarUsuarioService,
  ) {}
  async execute(id: number, input: IAtualizarUsuario): Promise<void> {
    if (!(await this.service.findById(id))) {
      throw new UsuarioNaoEncontradoError();
    }
    if (input.email && !(await this.service.findByEmail(input.email))) {
      throw new EmailJaUtilizadoError();
    }
    await this.service.atualizar(id, input);
  }
}

export class EmailJaUtilizadoError extends Error {
  code = 409;
  message = 'e-mail duplicado';
}
