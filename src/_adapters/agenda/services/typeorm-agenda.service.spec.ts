import { Connection, createConnection, Repository } from 'typeorm';
import { TypeOrmAgendaService } from './typeorm-agenda.service';
import { SlotAgendaDbEntity } from '../entidades/slot-agenda-db.entity';
import * as dayjs from 'dayjs';
import { SlotAgendaParam } from '../../../_business/agenda/services/agenda.service';
import { VoluntarioDbEntity } from '../../voluntarios/entidades/voluntario-db.entity';
import { UsuarioDbEntity } from '../../usuarios/entidades/usuario.db.entity';
import { DEFAULT_PASSWORD, MOCKED_SALT } from '../../../../jest.setup';
import { faker } from '@faker-js/faker';
import { TipoUsuario } from '../../../_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { FrenteAtuacao } from '../../../_business/voluntarios/entidades/voluntario.entity';
describe('Agenda Repo', () => {
  faker.setLocale('pt_BR');
  let connection: Connection;
  let repo: Repository<SlotAgendaDbEntity>;
  let usuarioRepo: Repository<UsuarioDbEntity>;
  let voluntarioRepo: Repository<VoluntarioDbEntity>;
  let sut: TypeOrmAgendaService;

  const request: SlotAgendaParam = {
    voluntarioId: 1,
    inicio: dayjs().toDate(),
    fim: dayjs().add(1, 'hour').toDate(),
  };

  beforeAll(async () => {
    connection = await createConnection({
      type: 'sqlite',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: [SlotAgendaDbEntity, VoluntarioDbEntity, UsuarioDbEntity],
    });
  });
  beforeEach(async () => {
    await connection.synchronize(true);
    repo = connection.getRepository(SlotAgendaDbEntity);
    usuarioRepo = connection.getRepository(UsuarioDbEntity);
    voluntarioRepo = connection.getRepository(VoluntarioDbEntity);
    sut = new TypeOrmAgendaService(repo);
  });
  beforeEach(async () => {
    const usuario = await usuarioRepo.save(
      usuarioRepo.create({
        senha: DEFAULT_PASSWORD,
        nome: faker.name.firstName(),
        tipo: TipoUsuario.ATENDENTE,
        email: faker.internet.email(),
        dataTermos: new Date(),
        salt: MOCKED_SALT,
      }),
    );
    await voluntarioRepo.save(
      voluntarioRepo.create({
        id: usuario.id,
        usuario,
        aprovado: true,
        formado: false,
        anoFormacao: +dayjs().format('YYYY'),
        bio: faker.lorem.paragraphs(),
        frentes: [FrenteAtuacao.COACHING_DE_ROTINA_DE_ESTUDOS],
        instituicao: faker.lorem.words(),
      }),
    );
  });
  afterAll(async () => {
    await connection.close();
  });
  it('should connect', function () {
    expect(connection.isConnected).toBeTruthy();
  });
  it('deve criar um slot de agenda para uma pessoa atendente', async function () {
    await sut.cadastrar(request);
    const [slot] = await repo.find();
    expect(slot).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        inicio: expect.any(Date),
        fim: expect.any(Date),
      }),
    );
  });
  it('deve recuperar slots de atendimento', async () => {
    await repo.save(request);
    const slots = await sut.recuperaSlots();
    expect(slots).toHaveLength(1);
  });
  it('deve chamar o repository passando wheres', async () => {
    jest.spyOn(repo, 'find');
    await sut.recuperaSlots({
      voluntarioId: expect.any(Number),
      inicio: expect.any(Date),
      fim: expect.any(Date),
    });
    expect(repo.find).toHaveBeenCalledWith({
      where: expect.any(Object),
    });
  });
  it('Deve encontrar por id de slot', async () => {
    await sut.cadastrar(request);
    const [slotEntity] = await repo.find();
    const slot = await sut.findById(slotEntity.id);
    expect(slot).toBeDefined();
  });
  it('Deve remover um slot por id', async () => {
    await sut.cadastrar(request);
    const [slotEntity] = await repo.find();
    await sut.removerSlot(slotEntity.id);
    expect(await repo.find()).toHaveLength(0);
  });
  it('Deve atualizar um slot por id', async () => {
    await sut.cadastrar(request);
    const [slot] = await repo.find();
    await sut.atualiza(slot.id, {
      inicio: expect.any(Date),
      fim: expect.any(Date),
    });
    expect(slot).toEqual(
      expect.objectContaining({
        id: request.voluntarioId,
        inicio: expect.any(Date),
        fim: expect.any(Date),
      }),
    );
  });
});
