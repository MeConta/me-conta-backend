import { Connection, createConnection, Repository } from 'typeorm';
import {
  Estado,
  Genero,
  Usuario,
} from '../../../_business/usuarios/entidades/usuario.entity';
import { UsuarioDbEntity } from '../../usuarios/entidades/usuario.db.entity';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { MOCKED_SALT } from '../../../../jest.setup';
import { VoluntarioDbEntity } from '../entidades/voluntario-db.entity';
import { TypeormVoluntarioService } from './typeorm-voluntario.service';
import { NovoVoluntario } from '../../../_business/voluntarios/casos-de-uso/cadastrar-voluntario.feat';
import { FrenteAtuacao } from '../../../_business/voluntarios/entidades/voluntario.entity';

describe('VoluntarioService', () => {
  let connection: Connection;
  let repository: Repository<VoluntarioDbEntity>;
  let service: TypeormVoluntarioService;
  const request = {
    usuario: { id: 1 } as Usuario,
    genero: Genero.FEMININO,
    estado: Estado.AC,
    dataNascimento: new Date(),
    cidade: 'Acrelândia',
    formado: false,
    semestre: 10,
    frentes: [FrenteAtuacao.COACHING_DE_ROTINA_DE_ESTUDOS],
    instituicao: 'Teste',
  } as NovoVoluntario;

  beforeAll(async () => {
    connection = await createConnection({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: [UsuarioDbEntity, VoluntarioDbEntity],
    });
  });
  beforeEach(async () => {
    await connection.synchronize(true);
    repository = connection.getRepository(VoluntarioDbEntity);
    service = new TypeormVoluntarioService(repository);
  });

  beforeEach(async () => {
    const usuarioEntity = connection.getRepository(UsuarioDbEntity);
    const usuario = usuarioEntity.create({
      id: 1,
      nome: 'Teste',
      email: 'email@email.com',
      senha: 's3Nh4vAl!d@',
      tipo: TipoUsuario.ATENDENTE,
      salt: MOCKED_SALT,
      dataTermos: new Date(),
    });
    await usuarioEntity.save(usuario);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('deve conectar', function () {
    expect(connection.isConnected).toBeTruthy();
  });

  it('Deve cadastrar novo aluno', async () => {
    await service.cadastrar(request);
    const voluntarios = await repository.find();
    expect(voluntarios[0]).toEqual(
      expect.objectContaining({
        usuarioId: expect.any(Number),
      } as VoluntarioDbEntity),
    );
  });
});
