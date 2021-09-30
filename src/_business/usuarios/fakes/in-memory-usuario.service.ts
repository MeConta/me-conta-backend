import {
  ICadastrarNovoUsuario,
  NovoUsuario,
} from '../casos-de-uso/cadastrar-novo-usuario.feat';
import { Usuario } from '../entidades/usuario.entity';

export class InMemoryUsuarioService implements ICadastrarNovoUsuario {
  usuarios: Usuario[] = [];
  cadastrar(param: NovoUsuario): Promise<void> {
    this.usuarios.push({
      id: this.usuarios.length,
      nome: param.nome,
      email: param.email,
      tipoUsuario: param.tipo,
      senha: param.senha,
      salt: 'salt',
    });
    return Promise.resolve();
  }
}
