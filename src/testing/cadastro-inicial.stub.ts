import { CreateCadastroInicialDto } from '../cadastro-inicial/dto/create-cadastro-inicial.dto';
import { Tipo } from '../usuario/entities/usuario.enum';
import { DEFAULT_PASSWORD, MOCKED_SALT } from '../../jest.setup';
import { Usuario } from '../_business/usuarios/entidades/usuario.entity';
import * as bcrypt from 'bcrypt';
import { TipoUsuario } from '../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

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
      tipoUsuario: TipoUsuario.ALUNO,
      salt: MOCKED_SALT,
    };
  }
}
