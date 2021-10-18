import { ICadastrarPerfilService } from '../../../_business/perfil/interfaces/cadastrar-perfil.service';
import { TypeormPerfilService } from './typeorm-perfil.service';
import { Connection, createConnection, Repository } from 'typeorm';
import { PerfilDbEntity } from '../entidades/perfil.db.entity';
import {
  Estado,
  Genero,
  Usuario,
} from '../../../_business/usuarios/entidades/usuario.entity';
import { UsuarioDbEntity } from '../../usuarios/entidades/usuario.db.entity';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';

describe('PerfilService', function () {
  let connection: Connection;
  let repository: Repository<PerfilDbEntity>;
  let service: ICadastrarPerfilService;
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
    await usuarioRepo.save({
      senha: 'mock',
      nome: 'mock',
      tipo: TipoUsuario.ALUNO,
      email: 'teste@teste.com',
      dataTermos: new Date(),
      salt: 'salt',
      id: 1,
    });
  });
  afterAll(async () => {
    await connection.close();
  });
  it('Deve conectar', function () {
    expect(connection.isConnected).toBeTruthy();
  });
  it('Deve cadastrar um perfil', async () => {
    await service.cadastrar({
      cidade: 'Acrelândia',
      dataNascimento: new Date(1996, 7, 12),
      estado: Estado.AC,
      genero: Genero.PREFIRO_NAO_DECLARAR,
      usuario: { id: 1 } as Usuario,
      telefone: '11912345678',
    });
    const perfis = await repository.find();
    expect(perfis[0]).toEqual(
      expect.objectContaining({
        cidade: 'Acrelândia',
        dataNascimento: expect.any(Date),
        /*estado: expect.any(Any),
        genero: expect.any(String),*/
        usuario: expect.any(Object),
        telefone: '11912345678',
      }),
    );
  });
});
