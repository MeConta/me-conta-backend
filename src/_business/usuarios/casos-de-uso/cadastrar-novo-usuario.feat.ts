import { IHashService } from '../../interfaces/hash.service';

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

export class CadastrarNovoUsuario {
  constructor(
    private readonly usuarioService: ICadastrarNovoUsuario,
    private readonly hashService: IHashService,
  ) {}
  async execute(input: NovoUsuario) {
    try {
      const SALT = await this.hashService.generateSalt();
      await this.usuarioService.cadastrar({
        ...input,
        senha: await this.hashService.hash(input.senha, SALT),
        salt: SALT,
      });
    } catch (e) {
      throw new DuplicatedError();
    }
  }
}
