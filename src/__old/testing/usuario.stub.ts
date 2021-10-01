import { Usuario } from '../../_business/usuarios/entidades/usuario.entity';
import { Estado, Genero } from '../../../__old/usuario/entities/usuario.enum';
import { CreateUsuarioDto } from '../../_adapters/usuarios/dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../../../__old/usuario/dto/update-usuario.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import * as bcrypt from 'bcrypt';
import { DEFAULT_PASSWORD, MOCKED_SALT } from '../../../jest.setup';
import { TipoUsuario } from '../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

export class UsuarioStub {
  static getCreateDto(): CreateUsuarioDto {
    return {
      nome: 'Maria da Silva',
      email: 'teste@teste.com',
      senha: DEFAULT_PASSWORD,
      tipo: TipoUsuario.ALUNO,
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
      nome: 'Maria da Silva',
      senha: bcrypt.hashSync(DEFAULT_PASSWORD, MOCKED_SALT),
      UF: Estado.AC,
      telefone: '(11) 94786-6489',
      tipoUsuario: TipoUsuario.ALUNO,
      salt: MOCKED_SALT,
      dataTermos: new Date(),
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
