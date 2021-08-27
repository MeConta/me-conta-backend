import { Usuario } from '../usuario/entities/usuario.entity';
import { Estado, Genero, Tipo } from '../usuario/entities/usuario.enum';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../usuario/dto/update-usuario.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

export class UsuarioStub {
  static getCreateDto(): CreateUsuarioDto {
    return {
      cidade: 'São Paulo',
      dataNascimento: new Date(),
      email: 'teste@teste.com',
      genero: Genero.FEMININO,
      nome: 'João da Silva',
      senha: 'teste',
      UF: Estado.AC,
      telefone: '5511947866489',
      tipoUsuario: Tipo.ADMINISTRADOR,
    };
  }

  static getUpdateDto(): UpdateUsuarioDto {
    return {
      email: 'alterado@teste.com',
    };
  }

  static getEntity(): Usuario {
    return {
      id: 1,
      cidade: 'São Paulo',
      dataNascimento: new Date(),
      email: 'teste@teste.com',
      genero: Genero.FEMININO,
      nome: 'João da Silva',
      senha: 'teste',
      UF: Estado.AC,
      telefone: '5511947866489',
      dataCriacao: new Date(),
      dataAlteracao: new Date(),
      tipoUsuario: Tipo.ADMINISTRADOR,
    };
  }

  static getEntities(numero = 1): Usuario[] {
    return Array<Usuario>(numero).fill(this.getEntity());
  }

  static getPaginatedEntities(n = 1): Pagination<Usuario> {
    return new Pagination(this.getEntities(n), {
      currentPage: 1,
      itemCount: n,
      itemsPerPage: 10,
      totalItems: n,
      totalPages: 1,
    });
  }
}
