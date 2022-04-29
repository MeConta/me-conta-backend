import {
  Connection,
  createConnection,
  FindOperator,
  Repository,
} from 'typeorm';
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
import { SlotAgendaDbEntity } from '../../agenda/entidades/slot-agenda-db.entity';

describe('VoluntarioService', () => {
  const usuarioNome = 'Teste';
  let connection: Connection;
  let repository: Repository<VoluntarioDbEntity>;
  let service: TypeormVoluntarioService;
  const request = {
    usuario: { id: 1, nome: usuarioNome } as Usuario,
    genero: Genero.FEMININO,
    estado: Estado.AC,
    dataNascimento: new Date(),
    cidade: 'Acrelândia',
    formado: false,
    semestre: 10,
    frentes: [FrenteAtuacao.COACHING_DE_ROTINA_DE_ESTUDOS],
    instituicao: 'Teste',
  } as NovoVoluntario & { aprovado?: boolean };

  beforeAll(async () => {
    connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: [UsuarioDbEntity, VoluntarioDbEntity, SlotAgendaDbEntity],
    });
  });
  beforeEach(async () => {
    await connection.synchronize(true);
    repository = connection.getRepository(VoluntarioDbEntity);
    service = new TypeormVoluntarioService(repository);
  });

  beforeEach(async () => {
    const usuarioEntity = connection.getRepository(UsuarioDbEntity);
    const usuario1 = usuarioEntity.create({
      id: 1,
      nome: usuarioNome,
      email: 'email@email.com',
      senha: 's3Nh4vAl!d@',
      tipo: TipoUsuario.ATENDENTE,
      salt: MOCKED_SALT,
      dataTermos: new Date(),
    });
    const usuario2 = usuarioEntity.create({
      id: 2,
      nome: 'outroUsuario',
      email: 'email2@email.com',
      senha: 's3Nh41Al!d@',
      tipo: TipoUsuario.ATENDENTE,
      salt: MOCKED_SALT,
      dataTermos: new Date(),
    });
    await usuarioEntity.save(usuario1);
    await usuarioEntity.save(usuario2);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('deve conectar', function () {
    expect(connection.isConnected).toBeTruthy();
  });

  it('Deve cadastrar novo voluntário', async () => {
    await service.cadastrar(request);
    const voluntarios = await repository.find();
    expect(voluntarios[0]).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
      } as VoluntarioDbEntity),
    );
  });

  it('Deve buscar um voluntário', async () => {
    const { id } = await repository.save(request);

    const voluntario = await service.findById(id);

    expect(voluntario).toBeDefined();
  });

  it('Deve atualizar a aprovação de um voluntário', async () => {
    const { id } = await repository.save(request);

    await service.atualizarAprovacao(id, {
      aprovado: true,
      link: 'meet.google.com/acs-cbso-yfy',
    });

    const { aprovado } = await repository.findOne(id);

    expect(aprovado).toBeTruthy();
  });

  it('Deve buscar voluntários por status de aprovação', async () => {
    await repository.save({ ...request, aprovado: true });

    const response = await service.buscar({ aprovado: true });

    expect(response).toHaveLength(1);
  });

  // TODO: quando for criar a feature de ordernação por ordem alfabetica, pode usar esse teste
  // it('Deve ordernar voluntários por nome', async () => {
  //   await repository.save(request);
  //   await repository.save({ ...request, usuario: { id: 2 } } as any);

  //   const response = await service.buscar();
  //   console.log(response);

  //   expect(response).toHaveLength(2);
  //   expect(response[0]).toEqual(
  //     expect.objectContaining({
  //       usuario: expect.objectContaining({
  //         nome: 'outroUsuario',
  //       }),
  //     }),
  //   );
  //   expect(response[1]).toEqual(
  //     expect.objectContaining({
  //       usuario: expect.objectContaining({
  //         nome: usuarioNome,
  //       }),
  //     }),
  //   );
  // });

  it('Deve buscar voluntários filtrando por nome', async () => {
    await repository.save(request);

    const response = await service.buscar({
      usuario: { nome: usuarioNome.substring(0, 3) },
    } as any);

    expect(response).toHaveLength(1);
    expect(response[0]).toEqual(
      expect.objectContaining({
        usuario: expect.objectContaining({
          nome: usuarioNome,
        }),
      }),
    );
  });

  it('Deve buscar todos os voluntários', async () => {
    await repository.save(request);

    const response = await service.buscar();

    expect(response).toHaveLength(1);
  });

  it('Deve buscar os voluntários filtrados por frente de atuação', async () => {
    jest.spyOn(repository, 'find');
    await repository.save(request);
    await service.buscar({
      frentes: [FrenteAtuacao.SESSAO_ACOLHIMENTO],
    });

    expect(repository.find).toHaveBeenCalledWith({
      relations: expect.any(Array),
      where: {
        frentes: expect.any(FindOperator),
      },
    });
  });
});
