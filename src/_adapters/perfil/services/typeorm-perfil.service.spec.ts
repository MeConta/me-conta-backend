import { TypeormPerfilService } from './typeorm-perfil.service';
import { Connection, createConnection, Repository } from 'typeorm';
import { PerfilDbEntity } from '../entidades/perfil.db.entity';
import {
  Estado,
  Genero,
  Perfil,
  Usuario,
} from '../../../_business/usuarios/entidades/usuario.entity';
import { UsuarioDbEntity } from '../../usuarios/entidades/usuario.db.entity';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { DEFAULT_PASSWORD, MOCKED_SALT } from '../../../../jest.setup';
import { name, internet, date } from 'faker/locale/pt_BR';
import {
  IAtualizarPerfilService,
  IBuscarPerfilByIdService,
  ICadastrarPerfilService,
} from '../../../_business/perfil/services/perfil.service';

describe('PerfilService', function () {
  let connection: Connection;
  let repository: Repository<PerfilDbEntity>;
  let service: ICadastrarPerfilService &
    IAtualizarPerfilService &
    IBuscarPerfilByIdService;

  const request: Perfil = {
    cidade: 'Acrelândia',
    dataNascimento: date.past(18),
    UF: Estado.AC,
    genero: Genero.PREFIRO_NAO_DECLARAR,
    usuario: { id: 1 } as Usuario,
    telefone: '11912345678',
  };

  beforeAll(async () => {
    connection = await createConnection({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: [PerfilDbEntity, UsuarioDbEntity],
    });
  });
  beforeEach(async () => {
    await connection.synchronize(true);
    repository = connection.getRepository(PerfilDbEntity);
    service = new TypeormPerfilService(repository);
  });
  beforeEach(async () => {
    const usuarioRepo = connection.getRepository(UsuarioDbEntity);
    await usuarioRepo.save(
      usuarioRepo.create({
        senha: DEFAULT_PASSWORD,
        nome: name.firstName(),
        tipo: TipoUsuario.ALUNO,
        email: internet.email(),
        dataTermos: new Date(),
        salt: MOCKED_SALT,
      }),
    );
  });
  afterAll(async () => {
    await connection.close();
  });

  it('Deve conectar', function () {
    expect(connection.isConnected).toBeTruthy();
  });

  it('Deve cadastrar um perfil', async () => {
    const { cidade, telefone } = request;
    await service.cadastrar(request);
    const [perfil] = await repository.find();
    expect(perfil).toEqual(
      expect.objectContaining({
        cidade,
        dataNascimento: expect.any(Date),
        usuario: expect.any(Object),
        telefone,
      }),
    );
  });

  it('Deve Atualizar um perfil', async () => {
    const { id } = await repository.save(repository.create(request));
    await service.atualizar(1, { ...request, UF: Estado.SP });
    const { UF } = await repository.findOne(id);
    expect(UF).toBe(Estado.SP);
  });

  it('Deve buscar um perfil', async () => {
    const { id } = await repository.save(repository.create(request));
    const response = await service.findById(id);
    expect(response).toBeDefined();
  });
});
