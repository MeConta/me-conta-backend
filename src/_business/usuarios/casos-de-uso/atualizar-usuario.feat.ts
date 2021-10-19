import { IBuscarUsuarioViaId } from './buscar-usuario.id.feat';
import { IBuscarUsuarioViaEmail } from './buscar-usuario-email.feat';
import { UsuarioNaoEncontradoError } from '../erros/erros';
import { Usuario } from '../entidades/usuario.entity';

export type IAtualizarUsuario = Partial<Omit<Usuario, 'salt'>>;

export interface IAtualizarUsuarioService {
  atualizar(id: number, input: IAtualizarUsuario): Promise<Usuario>;
}

export class AtualizarUsuario {
  constructor(
    private readonly service: IBuscarUsuarioViaId &
      IBuscarUsuarioViaEmail &
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
