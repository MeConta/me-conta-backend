import { IHashService } from '../interfaces/hash.service';

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
  cadastrar(
    usuario: NovoUsuario & { salt: string; dataTermos: Date },
  ): Promise<void>;
}

export class DuplicatedError extends Error {
  constructor() {
    super('e-mail duplicado');
  }
}

export class CadastrarNovoUsuario {
  constructor(
    private readonly usuarioService: ICadastrarNovoUsuario,
    private readonly passwordService: IHashService,
  ) {}
  async execute(input: NovoUsuario) {
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
