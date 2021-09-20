import {
  CriarNovoSlotDeAgenda,
  HorarioOcupado,
  UsuarioNaoAtendente,
} from './criar-novo-slot-de-agenda.feat';
import { InMemoryAgendaService } from './fakes/in-memory-agenda.service';
import { DateTimeUtils } from './date-time.utils';
import { MomentDateTimeUtils } from './fakes/moment-date-time.utils';
import { FakeAuthorizationService } from '../autorizacao/fakes/fake-authorization.service';
import { AuthorizationService } from '../autorizacao/authorization.service';

describe('criar novo slot na agenda', () => {
  let agendaService: InMemoryAgendaService;
  let sut: CriarNovoSlotDeAgenda;
  let dateTimeUtils: DateTimeUtils;
  let authorizationService: AuthorizationService;
  beforeEach(() => {
    agendaService = new InMemoryAgendaService();
    dateTimeUtils = new MomentDateTimeUtils();
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
      idUsuario: 'some-atendente-id',
    });
    expect(agendaService.slots).toContainEqual({
      inicio: new Date(2022, 11, 31, 10),
      fim: new Date(2022, 11, 31, 11, 0),
      idAtendente: 'some-atendente-id',
    });
  });
  it('deve rejeitar se usuario nao for atendente', async function () {
    await expect(
      sut.execute({
        inicio: new Date(2022, 11, 31, 10),
        idUsuario: 'some-aluno-id',
      }),
    ).rejects.toBeInstanceOf(UsuarioNaoAtendente);
  });
  it('deve rejeitar se o slot solicitado sobrepuser com outro ja existente', async function () {
    agendaService.slots.push({
      inicio: new Date(2022, 11, 31, 10),
      fim: new Date(2022, 11, 31, 11, 0),
      idAtendente: 'some-atendente-id',
    });
    await expect(
      sut.execute({
        inicio: new Date(2022, 11, 31, 9, 30),
        idUsuario: 'some-atendente-id',
      }),
    ).rejects.toBeInstanceOf(HorarioOcupado);
  });
});
