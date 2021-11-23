import { MomentDateTimeService } from './moment-date-time.service';
import * as moment from 'moment';

describe('Deve ser Definido', () => {
  let service: MomentDateTimeService;
  const date = moment().toDate();
  beforeEach(() => {
    service = new MomentDateTimeService();
  });
  it('Deve ser definido', () => {
    expect(service).toBeDefined();
  });
  describe('Manipulações de datas', () => {
    let dateResponse: Date;
    let response: Date;

    it('Deve Adicionar a uma data', () => {
      response = service.add(date, 1);
      dateResponse = moment(date).add(1, 'hour').toDate();
    });
    it('Deve recuperar o início de uma unidade para uma data', () => {
      response = service.startOf(date);
      dateResponse = moment(date).startOf('day').toDate();
    });
    it('Deve recuperar o fim de uma unidade para uma data', () => {
      response = service.endOf(date);
      dateResponse = moment(date).endOf('day').toDate();
    });
    afterEach(() => {
      expect(response.toISOString()).toBe(dateResponse.toISOString());
    });
  });

  it('Deve verificar se uma data é maior do que outra', () => {
    expect(service.greaterThan(moment().toDate(), date)).toBeTruthy();
  });
});
