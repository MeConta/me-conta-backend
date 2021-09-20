import { CriarNovoSlotDeAgenda } from './criar-novo-slot-de-agenda.feat';
import { InMemoryAgendaService } from './fakes/in-memory-agenda.service';
import { DateTimeUtils } from './date-time.utils';
import { MomentDateTimeUtils } from './fakes/moment-date-time.utils';

describe('criar novo slot na agenda', () => {
  let agendaService: InMemoryAgendaService;
  let sut: CriarNovoSlotDeAgenda;
  let dateTimeUtils: DateTimeUtils;
  beforeEach(() => {
    agendaService = new InMemoryAgendaService();
    dateTimeUtils = new MomentDateTimeUtils();
    sut = new CriarNovoSlotDeAgenda(agendaService, dateTimeUtils);
  });
  it('deve criar um slot com data e hora de inicio e fim uma hora depois do inicio, e id da pessoa atendente', async function () {
    await sut.execute({
      inicio: new Date(2022, 11, 31, 10),
      idAtendente: 'some-atendente-id',
    });
    expect(agendaService.slots).toContainEqual({
      inicio: new Date(2022, 11, 31, 10),
      fim: new Date(2022, 11, 31, 11, 0),
      idAtendente: 'some-atendente-id',
    });
  });
});
