import { IHashService } from '../interfaces/hash.service';

export enum TipoUsuario {
  ALUNO,
  SUPERVISOR,
  ATENDENTE,
  ADMINISTRADOR,
}
export interface NovoUsuario {
  nome: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;
}
export interface ICadastrarNovoUsuario {
  cadastrar(
    usuario: NovoUsuario & { salt: string; dataTermos: Date },
  ): Promise<void>;
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
    private readonly passwordService: IHashService,
  ) {}
  async execute(input: NovoUsuario) {
    if (input.tipo === TipoUsuario.ADMINISTRADOR) {
      throw new NoAdminCreationError();
    }
    try {
      const SALT = await this.passwordService.generateSalt();
      await this.usuarioService.cadastrar({
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
