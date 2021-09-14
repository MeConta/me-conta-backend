import { Usuario } from '../usuario/entities/usuario.entity';
import { Estado, Genero, Tipo } from '../usuario/entities/usuario.enum';
import { CreateUsuarioDto } from '../usuario/dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../usuario/dto/update-usuario.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import * as bcrypt from 'bcrypt';
import { DEFAULT_PASSWORD, MOCKED_SALT } from '../../jest.setup';

export class UsuarioStub {
  static getCreateDto(): CreateUsuarioDto {
    return {
      cidade: 'São Paulo',
      dataNascimento: new Date('06-05-1997'),
      email: 'teste@teste.com',
      genero: Genero.FEMININO,
      nome: 'João da Silva',
      senha: DEFAULT_PASSWORD,
      UF: Estado.AC,
      telefone: '(11) 94786-6489',
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
      dataNascimento: new Date('06-05-1997'),
      email: 'teste@teste.com',
      genero: Genero.FEMININO,
      nome: 'João da Silva',
      senha: bcrypt.hashSync(DEFAULT_PASSWORD, MOCKED_SALT),
      UF: Estado.AC,
      telefone: '(11) 94786-6489',
      dataCriacao: new Date('08-29-2021'),
      dataAlteracao: new Date('08-30-2021'),
      tipoUsuario: Tipo.ADMINISTRADOR,
      salt: MOCKED_SALT,
    };
  }

  static getEntities(numero = 1): Usuario[] {
    return Array<Usuario>(numero).fill(this.getEntity());
  }

  static getPaginatedEntities(n = 1): Pagination<Usuario> {
    return {
      items: this.getEntities(n),
      meta: {
        currentPage: 1,
        itemCount: n,
        itemsPerPage: 10,
        totalItems: n,
        totalPages: 1,
      },
    };
  }
}
