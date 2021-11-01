import {
  IBuscarRecuperacaoService,
  IRemoverRecuperacaoService,
  ISalvarHashRecuperacaoService,
} from '../../../_business/recuperacao/services/recuperacao.service';
import { Recuperacao } from '../../../_business/recuperacao/entidades/recuperacao.entity';
import { Connection, createConnection, Repository } from 'typeorm';
import { RecuperacaoDbEntity } from '../entidades/recuperacao.db.entity';
import { UsuarioDbEntity } from '../../usuarios/entidades/usuario.db.entity';
import { IHashGenerateRandomString } from '../../../_business/usuarios/services/hash.service';
import { Usuario } from '../../../_business/usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { TypeormRecuperacaoService } from './typeorm-recuperacao.service';
import * as moment from 'moment/moment';

describe('RecuperacaoService', () => {
  let connection: Connection;
  let repository: Repository<RecuperacaoDbEntity>;
  let service: ISalvarHashRecuperacaoService &
    IHashGenerateRandomString &
    IBuscarRecuperacaoService &
    IRemoverRecuperacaoService;

  const recuperacao: Recuperacao = {
    usuario: { id: 1 } as Usuario,
    hash: 'HASHED_VALUE',
    dataExpiracao: moment()
      .add(+process.env.PASSWORD_RECOVERY_EXPIRATION_DAYS, 'days')
      .toDate(),
  };

  beforeAll(async () => {
    connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: [UsuarioDbEntity, RecuperacaoDbEntity],
    });
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

    service = new TypeormRecuperacaoService(repository);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Deve conectar', () => {
    expect(connection.isConnected).toBeTruthy();
  });

  it('Deve criar uma hash', async () => {
    const response = await service.randomString();
    expect(response).toEqual(expect.any(String));
  });

  it('Deve salvar a hash no banco', async () => {
    await service.salvar(recuperacao);
    const [hash] = await repository.find();
    expect(hash).toEqual(
      expect.objectContaining({
        hash: 'HASHED_VALUE',
      } as Recuperacao),
    );
  });

  it('Deve buscar uma recuperação via hash', async () => {
    await repository.save(recuperacao);
    const { hash } = await service.findByHash('HASHED_VALUE');
    expect(hash).toBe('HASHED_VALUE');
  });
  it('Deve remover uma recuperação', async () => {
    await repository.save(recuperacao);
    await service.remover('HASHED_VALUE');
    const hashes = await repository.find();
    expect(hashes.length).toBeFalsy();
  });
});
