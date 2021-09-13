import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DbE2eModule } from './db.e2e.module';
import { AtendenteModule } from '../src/atendente/atendente.module';
import { AtendenteStub } from '../src/testing/atendente.stub';
import * as moment from 'moment';
import { setupApp } from '../src/config/app.config';
import { FrenteAtuacaoService } from '../src/frente-atuacao/frente-atuacao.service';
import { VoluntarioModule } from '../src/voluntario/voluntario.module';
import { FrenteAtuacaoStub } from '../src/testing/frente-atuacao.stub';
import { internet, name } from 'faker/locale/pt_BR';
import { UpdateAtendenteDto } from '../src/atendente/dto/update-atendente.dto';

describe('Atendente (e2e)', () => {
  let app: INestApplication;
  let frenteAtuacaoService: FrenteAtuacaoService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DbE2eModule, AtendenteModule, VoluntarioModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app = setupApp(app);

    frenteAtuacaoService = app.get(FrenteAtuacaoService);

    await app.init();
  });

  beforeAll(async () => {
    for (const i of Array(3)) {
      await frenteAtuacaoService.create({
        ...FrenteAtuacaoStub.getCreateDto(),
        nome: `Frente #${i}`,
      });
    }
  });

  describe('/atendente (POST)', () => {
    let req = {
      ...AtendenteStub.getCreateDto(),
      frentesAtuacao: [1, 2, 3],
      dataNascimento: moment('1990-09-25').toISOString(),
    };

    beforeEach(() => {
      req = {
        ...req,
        email: internet.email(),
      };
    });

    it('Deve criar um atendente formado', async () => {
      const response = await request(app.getHttpServer())
        .post('/atendente')
        .send({
          ...req,
          formado: true,
          anoConclusao: 2020,
          crp: 'RANDOM CRP',
          especializacao: 'Especialização',
        })
        .expect(HttpStatus.CREATED);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBeDefined();
      ID = response.body.id;
    });

    it('Deve criar um atendente não formado', async () => {
      const response = await request(app.getHttpServer())
        .post('/atendente')
        .send({
          ...req,
          formado: false,
          semestre: 6,
          frentesAtuacao: [1, 2, 3],
        })
        .expect(HttpStatus.CREATED);
      expect(response.body).toBeDefined();
    });

    it('Não deve criar um atendente formado sem anoConclusão, CRP e especialização', async () => {
      const response = await request(app.getHttpServer())
        .post('/atendente')
        .send({ ...req, formado: true })
        .expect(HttpStatus.BAD_REQUEST);
      expect(response.body).toBeDefined();
      expect(response.body.message).toBeInstanceOf(Array);
      expect(response.body.message).toHaveLength(3);
      expect(response.body.message).toContain(
        'anoConclusao must be a number conforming to the specified constraints',
      );
      expect(response.body.message).toContain(
        'especializacao should not be empty',
      );
      expect(response.body.message).toContain('crp should not be empty');
    });

    it('Não deve criar um atendente em formação sem semestre', async () => {
      const response = await request(app.getHttpServer())
        .post('/atendente')
        .send({
          ...req,
          formado: false,
          semestre: undefined,
        })
        .expect(HttpStatus.BAD_REQUEST);
      expect(response.body).toBeDefined();
      expect(response.body.message).toBeInstanceOf(Array);
      expect(response.body.message).toHaveLength(3);
      expect(response.body.message).toContain(
        'semestre must not be greater than 10',
      );
      expect(response.body.message).toContain(
        'semestre must not be less than 1',
      );
      expect(response.body.message).toContain('semestre should not be empty');
    });
  });

  describe('/atendente (GET)', () => {
    it('/atendente (GET)', async () => {
      const response = await request(app.getHttpServer())
        .get('/atendente')
        .expect(200);
      expect(response.body).toBeDefined();
      expect(response.body.items).toBeInstanceOf(Array);
      expect(response.body.items[0]).toBeDefined();
    });

    it('/atendente/:id (GET)', async () => {
      console.log('INFERNO! ID', ID);
      const response = await request(app.getHttpServer())
        .get(`/atendente/${ID}`)
        .expect(200);
      expect(response.body).toBeDefined();
    });
  });

  describe('/atendente (PATCH)', () => {
    const req = {
      ...AtendenteStub.getCreateDto(),
      frentesAtuacao: [1, 2, 3],
      dataNascimento: moment('1990-09-25').toISOString(),
    };
    let ID = null;
    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/atendente')
        .send(req);
      ID = response.body.id;
    });
    it('Deve alterar uma propriedade', async () => {
      const NOME = name.findName();
      const response = await request(app.getHttpServer())
        .patch(`/atendente/${ID}`)
        .send({
          nome: NOME,
        })
        .expect(HttpStatus.OK);
      expect(response.body.usuario.nome).toBe(NOME);
    });

    it('Não deve alterar caso formação seja VERDADEIRA e não passe os campos necessários', async () => {
      await request(app.getHttpServer())
        .patch(`/atendente/${ID}`)
        .send({
          formado: true,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Não deve alterar caso formação seja FALSA e não passe os campos necessários', async () => {
      await request(app.getHttpServer())
        .patch(`/atendente/${ID}`)
        .send({
          formado: false,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('O semestre deve ser NULO caso a formação seja VERDADEIRA', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/atendente/${ID}`)
        .send({
          formado: true,
          anoConclusao: 2020,
          crp: 'CRP',
          especializacao: 'teste',
        } as UpdateAtendenteDto)
        .expect(HttpStatus.OK);
      expect(response.body.semestre).toBeNull();
    });

    it('AnoConclusão, CRP e especialização devem ser NULOS caso a formação seja FALSA', async () => {
      const response = await request(app.getHttpServer())
        .patch(`/atendente/${ID}`)
        .send({
          formado: false,
          semestre: 3,
        } as UpdateAtendenteDto)
        .expect(HttpStatus.OK);
      expect(response.body.anoConclusao).toBeNull();
      expect(response.body.crp).toBeNull();
      expect(response.body.especializacao).toBeNull();
    });
  });

  it('/atendente (DELETE)', async () => {
    await request(app.getHttpServer())
      .delete(`/atendente/1`)
      .expect(HttpStatus.NO_CONTENT);
  });

  afterAll(async () => {
    await app.close();
  });
});
