import { Connection, createConnection, Repository } from 'typeorm';
import { TypeOrmAgendaService } from './typeorm-agenda.service';
import { SlotAgendaDbEntity } from './entidades/slot-agenda.db-entity';

describe('Agenda Repo', () => {
  let connection: Connection;
  let repo: Repository<SlotAgendaDbEntity>;
  let sut: TypeOrmAgendaService;
  beforeAll(async () => {
    connection = await createConnection({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: [SlotAgendaDbEntity],
    });
  });
  beforeEach(async () => {
    await connection.synchronize(true);
    repo = connection.getRepository(SlotAgendaDbEntity);
    sut = new TypeOrmAgendaService(repo);
  });
  afterAll(async () => {
    await connection.close();
  });
  it('should connect', function () {
    expect(connection.isConnected).toBeTruthy();
  });
  it('deve criar um slot de agenda para uma pessoa atendente', async function () {
    await sut.criarSlotNovo({
      idAtendente: '1',
      inicio: new Date(2022, 11, 31, 9),
      fim: new Date(2022, 11, 31, 10),
    });
    const slots = await repo.find();
    expect(slots).toContainEqual({
      id: expect.any(Number),
      idAtendente: '1',
      inicio: new Date(2022, 11, 31, 9).getTime(),
      fim: new Date(2022, 11, 31, 10).getTime(),
    });
  });
  it('deve retornar slots do periodo e atendente', async function () {
    await repo.save({
      idAtendente: '1',
      inicio: new Date(2022, 11, 30, 9).getTime(),
      fim: new Date(2022, 11, 30, 10).getTime(),
    });
    await repo.save({
      idAtendente: '1',
      inicio: new Date(2022, 11, 31, 9).getTime(),
      fim: new Date(2022, 11, 31, 10).getTime(),
    });
    await expect(
      sut.recuperaSlots({
        idAtendente: '1',
        inicio: new Date(2022, 11, 31, 0),
        fim: new Date(2022, 11, 31, 23, 59),
      }),
    ).resolves.toEqual([
      {
        id: 2,
        idAtendente: '1',
        inicio: new Date(2022, 11, 31, 9),
        fim: new Date(2022, 11, 31, 10),
      },
    ]);
  });
});
