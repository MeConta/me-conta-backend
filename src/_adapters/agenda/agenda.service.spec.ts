import {
  createConnection,
  Connection,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Repository,
} from 'typeorm';
import { CriarSlotAgendaService } from '../../_business/agendamentos/criar-slot-agenda.service';

export class PgAgendaService implements CriarSlotAgendaService {
  constructor(private readonly agendaRepo: Repository<SlotAgenda>) {}

  async criarSlotNovo(param: {
    inicio: Date;
    fim: Date;
    idAtendente: string;
  }): Promise<void> {
    const entity = this.agendaRepo.create(param);
    await this.agendaRepo.save(entity);
  }
}

@Entity('slot-agenda')
export class SlotAgenda {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idAtendente: string;

  @Column()
  inicio: Date;

  @Column()
  fim: Date;
}

describe('Agenda Repo', () => {
  let connection: Connection;
  let repo: Repository<SlotAgenda>;
  beforeAll(async () => {
    connection = await createConnection({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      logging: false,
      entities: [SlotAgenda],
    });
  });
  beforeEach(async () => {
    await connection.synchronize(true);
    repo = connection.getRepository(SlotAgenda);
  });
  afterAll(async () => {
    await connection.close();
  });
  it('should connect', function () {
    expect(connection.isConnected).toBeTruthy();
  });
  it('deve criar um slot de agenda para uma pessoa atendente', async function () {
    const sut = new PgAgendaService(repo);
    await sut.criarSlotNovo({
      idAtendente: '1',
      inicio: new Date(2022, 11, 31, 9),
      fim: new Date(2022, 11, 31, 10),
    });
    const slots = await repo.find();
    expect(slots).toContainEqual({
      id: expect.any(Number),
      idAtendente: '1',
      inicio: new Date(2022, 11, 31, 9),
      fim: new Date(2022, 11, 31, 10),
    });
  });
});
