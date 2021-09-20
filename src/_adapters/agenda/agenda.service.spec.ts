import {
  Column,
  Connection,
  createConnection,
  Entity,
  LessThanOrEqual,
  MoreThanOrEqual,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { CriarSlotAgendaService } from '../../_business/agendamentos/criar-slot-agenda.service';
import { RecuperaSlotsAgendaService } from '../../_business/agendamentos/recupera-slots-agenda.service';
import { SlotAgenda } from '../../_business/agendamentos/slot-agenda';

export class TypeOrmAgendaService
  implements CriarSlotAgendaService, RecuperaSlotsAgendaService
{
  constructor(private readonly agendaRepo: Repository<SlotAgendaDbEntity>) {}

  async criarSlotNovo(param: {
    inicio: Date;
    fim: Date;
    idAtendente: string;
  }): Promise<void> {
    const entity = this.agendaRepo.create({
      idAtendente: param.idAtendente,
      inicio: param.inicio.getTime(),
      fim: param.fim.getTime(),
    });
    await this.agendaRepo.save(entity);
  }

  async recuperaSlots(param: {
    inicio: Date;
    fim: Date;
    idAtendente: string;
  }): Promise<SlotAgenda[]> {
    const slotAgendaDbEntities = await this.agendaRepo.find({
      inicio: MoreThanOrEqual(param.inicio.getTime()),
      fim: LessThanOrEqual(param.fim.getTime()),
      idAtendente: param.idAtendente,
    });
    return slotAgendaDbEntities.map((dbEntity) => ({
      id: dbEntity.id,
      idAtendente: dbEntity.idAtendente,
      inicio: new Date(dbEntity.inicio),
      fim: new Date(dbEntity.fim),
    }));
  }
}

@Entity('slot-agenda')
export class SlotAgendaDbEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idAtendente: string;

  @Column()
  inicio: number;

  @Column()
  fim: number;
}

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
