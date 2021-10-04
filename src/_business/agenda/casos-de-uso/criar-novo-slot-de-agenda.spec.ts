import {
  CriarNovoSlotDeAgenda,
  HorarioOcupado,
  UsuarioNaoAtendente,
} from './criar-novo-slot-de-agenda.feat';
import { InMemoryAgendaService } from '../../../_adapters/agenda/services/in-memory-agenda.service';
import { DateTimeService } from '../interfaces/date-time.service';
import { MomentDateTimeService } from '../../../_adapters/agenda/services/moment-date-time.service';
import { FakeAuthorizationService } from '../../../_adapters/autorizacao/services/fake-authorization.service';
import { IAuthorizationService } from '../../autorizacao/interfaces/authorization.service';

describe('criar novo slot na agenda', () => {
  let agendaService: InMemoryAgendaService;
  let sut: CriarNovoSlotDeAgenda;
  let dateTimeUtils: DateTimeService;
  let authorizationService: IAuthorizationService;
  beforeEach(() => {
    agendaService = new InMemoryAgendaService();
    dateTimeUtils = new MomentDateTimeService();
    authorizationService = new FakeAuthorizationService();
    sut = new CriarNovoSlotDeAgenda(
      agendaService,
      dateTimeUtils,
      authorizationService,
    );
  });
  it('deve criar um slot com data e hora de inicio e fim uma hora depois do inicio, e id da pessoa atendente', async function () {
    await sut.execute({
      inicio: new Date(2022, 11, 31, 10),
      idUsuario: 1,
    });
    expect(agendaService.slots).toContainEqual({
      id: 0,
      inicio: new Date(2022, 11, 31, 10),
      fim: new Date(2022, 11, 31, 11, 0),
      idAtendente: 1,
    });
  });
  it('deve rejeitar se usuario nao for atendente', async function () {
    await expect(
      sut.execute({
        inicio: new Date(2022, 11, 31, 10),
        idUsuario: 2,
      }),
    ).rejects.toBeInstanceOf(UsuarioNaoAtendente);
  });
  it('deve rejeitar se o slot solicitado sobrepuser com outro ja existente', async function () {
    agendaService.slots.push({
      id: 1,
      inicio: new Date(2022, 11, 31, 10),
      fim: new Date(2022, 11, 31, 11, 0),
      idAtendente: 1,
    });
    await expect(
      sut.execute({
        inicio: new Date(2022, 11, 31, 9, 30),
        idUsuario: 1,
      }),
    ).rejects.toBeInstanceOf(HorarioOcupado);
  });
});