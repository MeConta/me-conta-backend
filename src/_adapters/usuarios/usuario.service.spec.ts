import { Connection, createConnection, Repository } from 'typeorm';
import { UsuarioDbEntity } from './entidades/usuario.db.entity';
import { TypeormUsuarioService } from './typeorm-usuario.service';
import { TipoUsuario } from '../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { MOCKED_SALT } from '../../../jest.setup';

describe('Usuario', () => {
  let connection: Connection;
  let repository: Repository<UsuarioDbEntity>;
  let sut: TypeormUsuarioService;

  const request = {
    nome: 'Teste',
    email: 'email@email.com',
    senha: 's3Nh4vAl!d@',
    tipo: TipoUsuario.ALUNO,
    salt: MOCKED_SALT,
    dataTermos: new Date(),
  };

  beforeAll(async () => {
    connection = await createConnection({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: [UsuarioDbEntity],
    });
  });
  beforeEach(async () => {
    await connection.synchronize(true);
    repository = connection.getRepository(UsuarioDbEntity);
    sut = new TypeormUsuarioService(repository);
  });
  afterAll(async () => {
    await connection.close();
  });

  it('deve conectar', function () {
    expect(connection.isConnected).toBeTruthy();
  });

  it('Deve cadastrar um novo usuário', async () => {
    await sut.cadastrar(request);
    const usuarios = await repository.find();
    expect(usuarios[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        nome: 'Teste',
        email: 'email@email.com',
        senha: 's3Nh4vAl!d@',
        tipoUsuario: TipoUsuario.ALUNO,
        salt: expect.any(String),
        dataTermos: expect.any(Date),
      } as UsuarioDbEntity),
    );
  });

  it('Deve buscar um usuário via e-mail', async () => {
    await sut.cadastrar(request);
    const response = await sut.findByEmail(request.email);
    expect(response).toEqual(
      expect.objectContaining({
        email: request.email,
      }),
    );
  });
  it('Deve buscar um usuário via id', async () => {
    await sut.cadastrar(request);
    const response = await sut.findById(1);
    expect(response).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
      }),
    );
  });
});
