export enum TipoUsuario {
  ALUNO = `Aluno`,
  SUPERVISOR = `Supervisor`,
  ATENDENTE = `Atendente`,
  ADMINISTRADOR = `Administrador`,
}
export interface NovoUsuario {
  nome: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;
}
export interface ICadastrarNovoUsuario {
  cadastrar(param: NovoUsuario): Promise<void>;
}
export class CadastrarNovoUsuario {
  constructor(private readonly usuarioService: ICadastrarNovoUsuario) {}
  async execute(input: NovoUsuario) {
    await this.usuarioService.cadastrar(input);
  }
}
