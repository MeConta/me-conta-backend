import { HttpStatus, INestApplication } from '@nestjs/common';
import { getToken } from '../utils.test';
import * as request from 'supertest';
import { Connection, Repository } from 'typeorm';
import { SlotAgendaDbEntity } from '../../src/_adapters/agenda/entidades/slot-agenda-db.entity';
import { TipoUsuario } from '../../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import * as dayjs from 'dayjs';
import { VoluntarioDbEntity } from '../../src/_adapters/voluntarios/entidades/voluntario-db.entity';
import { agendaTestingApp } from './agenda.utils';

// TODO: estes testes não estão funcionando
describe.skip('Remover um Slot de Agenda (e2e)', () => {
  let app: INestApplication;
  let token: string;
  beforeEach(async () => {
    app = await agendaTestingApp();
  });
  beforeEach(async () => {
    token = await getToken(app, TipoUsuario.ATENDENTE);
  });
  afterEach(async () => {
    await app.close();
  });
  describe('/agenda (DELETE)', () => {
    let voluntarioRepo: Repository<VoluntarioDbEntity>;
    let agendaRepo: Repository<SlotAgendaDbEntity>;
    beforeEach(async () => {
      voluntarioRepo = app.get(Connection).getRepository(VoluntarioDbEntity);
      agendaRepo = app.get(Connection).getRepository(SlotAgendaDbEntity);
      const [voluntario] = await voluntarioRepo.find();
      await agendaRepo.save(
        agendaRepo.create({
          inicio: dayjs().toDate(),
          fim: dayjs().add(1, 'hours').toDate(),
          voluntario: Promise.resolve(voluntario),
        }),
      );
    });
    it('Deve remover um slot com sucesso', async () => {
      await request(app.getHttpServer())
        .delete('/agenda/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.NO_CONTENT);
    });
  });
});
