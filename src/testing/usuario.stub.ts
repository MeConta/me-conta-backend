import { Usuario } from '../usuario/entities/usuario.entity';

export class UsuarioStub {
  static getEntity(): Usuario {
    return {
      id: 1,
      cidade: 'São Paulo',
      dataNascimento: new Date(),
      email: 'teste@teste.com',
      genero: 'M',
      nome: 'João da Silva',
      senha: 'teste',
      UF: 'SP',
      telefone: '5511947866489',
      dataCriacao: new Date(),
      dataAlteracao: new Date(),
      tipoUsuario: {
        id: 1,
        nome: 'Admin',
        descricao: 'Bonecos',
        dataCriacao: new Date(),
        dataAlteracao: new Date(),
      },
    };
  }
  static getEntities(numero = 1): Usuario[] {
    return Array<Usuario>(numero).fill(this.getEntity());
  }
}
