import { Connection, createConnection, Repository } from 'typeorm';
import { UsuarioDbEntity } from './entidades/usuario.db.entity';
import { TypeormUsuarioService } from './typeorm-usuario.service';
import { TipoUsuario } from '../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { IHashService } from '../../_business/interfaces/hash.service';

describe('Usuario', () => {
  let connection: Connection;
  let repository: Repository<UsuarioDbEntity>;
  let hashService: IHashService;
  let sut: TypeormUsuarioService;
  beforeAll(async () => {
    connection = await createConnection({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: [UsuarioDbEntity],
    });
    hashService = {
      generateSalt: jest.fn().mockResolvedValue('salt'),
    };
  });
  beforeEach(async () => {
    await connection.synchronize(true);
    repository = connection.getRepository(UsuarioDbEntity);
    sut = new TypeormUsuarioService(repository, hashService);
  });
  afterAll(async () => {
    await connection.close();
  });

  it('should connect', function () {
    expect(connection.isConnected).toBeTruthy();
  });
  it('Deve cadastrar um novo usuário', async () => {
    await sut.cadastrar({
      nome: 'Teste',
      email: 'email@email.com',
      senha: 's3Nh4vAl!d@',
      tipo: TipoUsuario.ALUNO,
    });
    const usuarios = await repository.find();
    expect(usuarios[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        nome: 'Teste',
        email: 'email@email.com',
        senha: 's3Nh4vAl!d@',
        tipoUsuario: TipoUsuario.ALUNO,
        salt: expect.any(String),
      } as UsuarioDbEntity),
    );
  });
});
