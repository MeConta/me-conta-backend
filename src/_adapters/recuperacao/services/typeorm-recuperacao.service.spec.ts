import {
  ICriarHashRecuperacaoService,
  ISalvarHashRecuperacaoService,
} from '../../../_business/recuperacao/services/recuperacao.service';
import { Recuperacao } from '../../../_business/recuperacao/entidades/recuperacao.entity';
import { Connection, createConnection, Repository } from 'typeorm';
import { RecuperacaoDbEntity } from '../entidades/recuperacao.db.entity';
import { UsuarioDbEntity } from '../../usuarios/entidades/usuario.db.entity';
import { IHashService } from '../../../_business/usuarios/services/hash.service';
import { createMock } from '@golevelup/ts-jest';
import { MOCKED_SALT } from '../../../../jest.setup';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { TypeormRecuperacaoService } from './typeorm-recuperacao.service';

describe('RecuperacaoService', () => {
  let connection: Connection;
  let repository: Repository<RecuperacaoDbEntity>;
  let hashService: IHashService;
  let service: ISalvarHashRecuperacaoService & ICriarHashRecuperacaoService;

  beforeAll(async () => {
    connection = await createConnection({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: [UsuarioDbEntity, RecuperacaoDbEntity],
    });
  });

  beforeEach(async () => {
    hashService = createMock<IHashService>();
    jest.spyOn(hashService, 'generateSalt').mockResolvedValue(MOCKED_SALT);
    jest.spyOn(hashService, 'hash').mockResolvedValue('HASHED_VALUE');
  });

  beforeEach(async () => {
    await connection.synchronize(true);
    repository = connection.getRepository(RecuperacaoDbEntity);
    const usuarioRepo = connection.getRepository(UsuarioDbEntity);
    await usuarioRepo.save({
      senha: 'mock',
      nome: 'mock',
      tipo: TipoUsuario.ALUNO,
      email: 'teste@teste.com',
      dataTermos: new Date(),
      salt: 'salt',
      id: 1,
    });

    service = new TypeormRecuperacaoService(repository, hashService);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Deve conectar', () => {
    expect(connection.isConnected).toBeTruthy();
  });

  it('Deve criar uma hash', async () => {
    const response = await service.criarHash();
    expect(response).toBe('HASHED_VALUE');
  });

  it('Deve salvar a hash no banco', async () => {
    await service.salvar({
      usuario: { id: 1 } as Usuario,
      hash: 'HASHED_VALUE',
    });
    const hashes = await repository.find();
    expect(hashes[0]).toEqual(
      expect.objectContaining({
        hash: 'HASHED_VALUE',
      } as Recuperacao),
    );
  });
});
