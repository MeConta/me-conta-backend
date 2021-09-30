import {
  ICadastrarNovoUsuario,
  NovoUsuario,
} from '../casos-de-uso/cadastrar-novo-usuario.feat';
import { Usuario } from '../entidades/usuario.entity';

export class InMemoryUsuarioService implements ICadastrarNovoUsuario {
  usuarios: Usuario[] = [];
  cadastrar(
    usuario: NovoUsuario & { salt: string; dataTermos: Date },
  ): Promise<void> {
    this.usuarios.push({
      id: this.usuarios.length,
      nome: usuario.nome,
      email: usuario.email,
      tipoUsuario: usuario.tipo,
      senha: usuario.senha,
      salt: usuario.salt,
      dataTermos: usuario.dataTermos,
    });
    return Promise.resolve();
  }
}
