import { Connection, createConnection, Repository } from 'typeorm';
import { UsuarioDbEntity } from '../entidades/usuario.db.entity';
import { TypeormUsuarioService } from './typeorm-usuario.service';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { DEFAULT_PASSWORD, MOCKED_SALT } from '../../../../jest.setup';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { faker } from '@faker-js/faker';

describe('Usuario', () => {
  faker.setLocale('pt_BR');

  let connection: Connection;
  let repository: Repository<UsuarioDbEntity>;
  let sut: TypeormUsuarioService;

  const request = {
    nome: faker.name.firstName(),
    email: faker.internet.email(),
    senha: DEFAULT_PASSWORD,
    tipo: TipoUsuario.ALUNO,
    salt: MOCKED_SALT,
    dataTermos: new Date(),
  };

  beforeAll(async () => {
    connection = await createConnection({
      type: 'sqlite',
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
        nome: request.nome,
        email: request.email,
        senha: request.senha,
        tipo: request.tipo,
        salt: request.salt,
        dataTermos: request.dataTermos,
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

  it('Deve atualizar um usuário', async () => {
    const entity = await repository.save(repository.create(request));
    const response = await sut.atualizar(entity.id, {
      nome: 'Novo Nome',
    });
    expect(response).toEqual(
      expect.objectContaining({
        nome: 'Novo Nome',
      } as Usuario),
    );
  });
});
