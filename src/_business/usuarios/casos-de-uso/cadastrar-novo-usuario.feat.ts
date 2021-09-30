import { IHashService } from '../../interfaces/hash.service';
import { IPasswordStrengthService } from '../../interfaces/password-strength.service';

export enum TipoUsuario {
  ALUNO = `Aluno`,
  SUPERVISOR = `Voluntário Supervisor`,
  ATENDENTE = `Voluntário Atendente`,
  ADMINISTRADOR = `Administrador`,
}
export interface NovoUsuario {
  nome: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;
}
export interface ICadastrarNovoUsuario {
  cadastrar(param: NovoUsuario & { salt: string }): Promise<void>;
}

export class DuplicatedError extends Error {
  constructor() {
    super('e-mail duplicado');
  }
}
export class WeakPasswordError extends Error {
  constructor() {
    super('senha fraca');
  }
}

export class CadastrarNovoUsuario {
  constructor(
    private readonly usuarioService: ICadastrarNovoUsuario,
    private readonly passwordService: IHashService & IPasswordStrengthService, // private readonly passwordService: IPasswordStrengthService,
  ) {}
  async execute(input: NovoUsuario) {
    if (
      this.passwordService.getStrength(input.senha) <=
      +process.env.PASSWORD_STRENGTH
    ) {
      throw new WeakPasswordError();
    }

    try {
      const SALT = await this.passwordService.generateSalt();
      await this.usuarioService.cadastrar({
        ...input,
        senha: await this.passwordService.hash(input.senha, SALT),
        salt: SALT,
      });
    } catch (e) {
      throw new DuplicatedError();
    }
  }
}
