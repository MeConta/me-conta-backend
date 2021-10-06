import {
  ICadastrarNovoUsuario,
  NovoUsuario,
} from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';

export class InMemoryUsuarioService implements ICadastrarNovoUsuario {
  usuarios: Usuario[] = [];
  cadastrar(
    usuario: NovoUsuario & { salt: string; dataTermos: Date },
  ): Promise<Usuario> {
    const len = this.usuarios.push({
      id: this.usuarios.length,
      nome: usuario.nome,
      email: usuario.email,
      tipo: usuario.tipo,
      senha: usuario.senha,
      salt: usuario.salt,
      dataTermos: usuario.dataTermos,
    });
    return Promise.resolve(this.usuarios[len - 1]);
  }
}
