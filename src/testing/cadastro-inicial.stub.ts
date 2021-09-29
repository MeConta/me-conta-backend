import { CreateCadastroInicialDto } from '../cadastro-inicial/dto/create-cadastro-inicial.dto';
import { Tipo } from '../usuario/entities/usuario.enum';
import { DEFAULT_PASSWORD, MOCKED_SALT } from '../../jest.setup';
import { Usuario } from '../usuario/entities/usuario.entity';
import * as bcrypt from 'bcrypt';

export class CadastroInicialStub {
  static getCreateDto(): CreateCadastroInicialDto {
    return {
      nome: 'Maria da Silva',
      senha: DEFAULT_PASSWORD,
      email: 'teste@teste.com',
      tipoUsuario: Tipo.ATENDENTE,
    };
  }

  static getEntity(): Usuario {
    return {
      id: 1,
      cidade: null,
      dataNascimento: null,
      email: 'teste@teste.com',
      genero: null,
      nome: 'Maria da Silva',
      senha: bcrypt.hashSync(DEFAULT_PASSWORD, MOCKED_SALT),
      UF: null,
      telefone: null,
      dataCriacao: new Date('08-29-2021'),
      dataAlteracao: new Date('08-30-2021'),
      tipoUsuario: Tipo.ADMINISTRADOR,
      salt: MOCKED_SALT,
    };
  }
}
