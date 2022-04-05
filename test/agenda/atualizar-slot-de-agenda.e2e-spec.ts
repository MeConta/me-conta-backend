import { HttpStatus, INestApplication } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as request from 'supertest';
import { TestingModule } from '@nestjs/testing';
import { Connection } from 'typeorm';

import { getTestingModule, getToken } from '../utils.test';
import { TipoUsuario } from '../../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { UsuarioModule } from '../../src/modules/usuario/usuario.module';
import { VoluntarioModule } from '../../src/modules/voluntario/voluntario.module';
import { AgendaModule } from '../../src/modules/agenda/agenda.module';
import { setupApp } from '../../src/config/app.config';
import { VoluntarioDbEntity } from '../../src/_adapters/voluntarios/entidades/voluntario-db.entity';
import { AtualizarSlotAgendaDto } from '../../src/_adapters/agenda/dto/atualizar-slot-agenda.dto';

describe('Atualizar slot de Agenda (e2e)', () => {
  let app: INestApplication;
  let token: string;
  const req = {
    slot: {
      inicio: dayjs().add(3, 'day').toDate().toISOString(),
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await getTestingModule([
      AuthModule,
      UsuarioModule,
      VoluntarioModule,
      AgendaModule,
    ]);

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  beforeEach(async () => {
    token = await getToken(app, TipoUsuario.ATENDENTE);

    const voluntarioRepo = app
      .get(Connection)
      .getRepository(VoluntarioDbEntity);

    await voluntarioRepo.save({
      ...(await voluntarioRepo.findOne(1)),
      aprovado: true,
    });

    const createSlotReq = {
      slots: [
        {
          inicio: dayjs().add(4, 'day').toDate(),
        },
        {
          inicio: dayjs().add(2, 'day').toDate(),
        },
        {
          inicio: dayjs().add(6, 'day').toDate(),
        },
        {
          inicio: dayjs().add(1, 'day').toDate(),
        },
      ],
    };

    await request(app.getHttpServer())
      .post('/agenda')
      .set('Authorization', `Bearer ${token}`)
      .send(createSlotReq);
  });
  afterEach(async () => {
    await app.close();
  });

  describe('/agenda (PUT)', () => {
    it('Deve atualizar um slot com sucesso', async () => {
      const updateReq = {
        slot: {
          inicio: dayjs().add(5, 'day').toDate(),
        },
      } as AtualizarSlotAgendaDto;

      await request(app.getHttpServer())
        .put('/agenda/1')
        .set('Authorization', `Bearer ${token}`)
        .send(updateReq)
        .expect(HttpStatus.OK);
    });

    it('Deve dar erro quando tentar atualizar um slot que não existe', async () => {
      await request(app.getHttpServer())
        .put('/agenda/73')
        .set('Authorization', `Bearer ${token}`)
        .send(req)
        .expect(HttpStatus.NOT_FOUND);
    });

    // TODO: Teste para slots conflitantes
    // it('Deve dar erro quando a data do slot a ser atualizado conflita com um slot já existente', async () => {
    //   const reqConflict = {
    //     slot: {
    //       inicio: dayjs().subtract(4, 'day').toDate(),
    //     },
    //   };

    //   await request(app.getHttpServer())
    //     .put('/agenda/3')
    //     .set('Authorization', `Bearer ${token}`)
    //     .send(reqConflict)
    //     .expect(HttpStatus.CONFLICT);
    // });

    it('Deve dar erro quando o slot a ser atualizado será realizado no prazo de 24 horas', async () => {
      const reqBadRequest = {
        slot: {
          inicio: dayjs().add(4, 'day').toDate(),
        },
      };

      await request(app.getHttpServer())
        .put('/agenda/4')
        .set('Authorization', `Bearer ${token}`)
        .send(reqBadRequest)
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Deve dar erro 400', async () => {
      await request(app.getHttpServer())
        .put('/agenda/2')
        .set('Authorization', `Bearer ${token}`)
        .send({ slot: null })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Deve dar erro 401', async () => {
      await request(app.getHttpServer())
        .put('/agenda/3973')
        .send(req)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('Deve dar erro 403', async () => {
      await request(app.getHttpServer())
        .put('/agenda/8347')
        .set('Authorization', `Bearer ${await getToken(app)}`)
        .send(req)
        .expect(HttpStatus.FORBIDDEN);
    });
  });
});
