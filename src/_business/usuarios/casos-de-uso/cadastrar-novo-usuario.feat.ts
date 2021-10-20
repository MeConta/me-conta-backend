import {
  IHashGenerateSaltService,
  IHashHashService,
} from '../services/hash.service';
import { Usuario } from '../entidades/usuario.entity';

export enum TipoUsuario {
  ALUNO,
  SUPERVISOR,
  ATENDENTE,
  ADMINISTRADOR,
}
export type NovoUsuario = {
  nome: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;
};

export type NovoUsuarioResponse = Pick<
  Usuario,
  'id' | 'email' | 'nome' | 'tipo'
>;
export interface ICadastrarNovoUsuario {
  cadastrar(
    usuario: NovoUsuario & { salt: string; dataTermos: Date },
  ): Promise<Usuario>;
}

export class DuplicatedError extends Error {
  public code = 409;
  public message = 'e-mail duplicado';
}

export class NoAdminCreationError extends Error {
  public code = 403;
  public message = 'Não pode criar administrador';
}

export class CadastrarNovoUsuario {
  constructor(
    private readonly usuarioService: ICadastrarNovoUsuario,
    private readonly passwordService: IHashGenerateSaltService &
      IHashHashService,
  ) {}
  async execute(input: NovoUsuario): Promise<Usuario> {
    if (input.tipo === TipoUsuario.ADMINISTRADOR) {
      throw new NoAdminCreationError();
    }
    try {
      const SALT = await this.passwordService.generateSalt();
      return await this.usuarioService.cadastrar({
        ...input,
        senha: await this.passwordService.hash(input.senha, SALT),
        salt: SALT,
        dataTermos: new Date(),
      });
    } catch (e) {
      throw new DuplicatedError();
    }
  }
}
