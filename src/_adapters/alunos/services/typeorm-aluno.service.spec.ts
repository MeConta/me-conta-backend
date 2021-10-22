import { Connection, createConnection, Repository } from 'typeorm';
import { AlunoDbEntity } from '../entidades/aluno.db.entity';
import { TypeormAlunoService } from './typeorm-aluno.service';
import {
  Escolaridade,
  NovoAluno,
  TipoEscola,
} from '../../../_business/alunos/entidades/aluno.entity';
import {
  Estado,
  Genero,
  Usuario,
} from '../../../_business/usuarios/entidades/usuario.entity';
import { UsuarioDbEntity } from '../../usuarios/entidades/usuario.db.entity';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { MOCKED_SALT } from '../../../../jest.setup';

describe('AlunoService', () => {
  let connection: Connection;
  let repository: Repository<AlunoDbEntity>;
  let service: TypeormAlunoService;
  const request = {
    usuario: { id: 1 } as Usuario,
    escolaridade: Escolaridade.PRIMEIRO_ANO,
    genero: Genero.FEMININO,
    estado: Estado.AC,
    dataNascimento: new Date(),
    cidade: 'Acrelândia',
    tipoEscola: TipoEscola.PUBLICA,
    telefone: '11912345678',
  } as NovoAluno;

  beforeAll(async () => {
    connection = await createConnection({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: [UsuarioDbEntity, AlunoDbEntity],
    });
  });
  beforeEach(async () => {
    await connection.synchronize(true);
    repository = connection.getRepository(AlunoDbEntity);
    service = new TypeormAlunoService(repository);
  });

  beforeEach(async () => {
    const usuarioEntity = connection.getRepository(UsuarioDbEntity);
    const usuario = usuarioEntity.create({
      id: 1,
      nome: 'Teste',
      email: 'email@email.com',
      senha: 's3Nh4vAl!d@',
      tipo: TipoUsuario.ALUNO,
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
    const [aluno] = await repository.find();
    expect(aluno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
      } as AlunoDbEntity),
    );
  });

  it('Deve buscar um aluno via id', async () => {
    await repository.save(request);
    await service.findById(1);
    const aluno = await repository.findOne(1);
    expect(aluno).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
      } as AlunoDbEntity),
    );
  });

  it('Deve Atualizar um aluno', async () => {
    await repository.save(request);
    await service.atualizar(1, {
      ...request,
      tipoEscola: TipoEscola.PARTICULAR,
    });
    const aluno = await repository.findOne(1);
    expect(aluno).toEqual(
      expect.objectContaining({
        tipoEscola: TipoEscola.PARTICULAR,
      } as AlunoDbEntity),
    );
  });
});
