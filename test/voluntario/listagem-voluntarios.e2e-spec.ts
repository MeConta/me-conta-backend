import { HttpStatus, INestApplication } from '@nestjs/common';
import { getTestingModule, getToken } from '../utils.test';
import * as request from 'supertest';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { UsuarioModule } from '../../src/modules/usuario/usuario.module';
import { VoluntarioModule } from '../../src/modules/voluntario/voluntario.module';
import { setupApp } from '../../src/config/app.config';
import { address, lorem } from 'faker/locale/pt_BR';
import { DEFAULT_PHONE } from '../../jest.setup';
import {
  Estado,
  Genero,
} from '../../src/_business/usuarios/entidades/usuario.entity';
import { CreateVoluntarioDto } from '../../src/_adapters/voluntarios/dto/create-voluntario.dto';
import * as dayjs from 'dayjs';
import { TipoUsuario } from '../../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import {
  AreaAtuacao,
  FrenteAtuacao,
} from '../../src/_business/voluntarios/entidades/voluntario.entity';
import { VoluntarioDbEntity } from '../../src/_adapters/voluntarios/entidades/voluntario-db.entity';
import { Connection } from 'typeorm';
import { VoluntarioOutput } from '../../src/_business/voluntarios/dtos/voluntario.dto';

describe('Listagem de Voluntários (e2)', () => {
  let app: INestApplication;
  let token: string;
  const voluntarioReq = {
    telefone: DEFAULT_PHONE,
    dataNascimento: dayjs().subtract(18, 'years').toDate(),
    cidade: address.city(),
    UF: Estado.AC,
    genero: Genero.PREFIRO_NAO_DECLARAR,
    instituicao: lorem.word(2),
    formado: false,
    semestre: 10,
    anoFormacao: +dayjs().format('YYYY'),
    crp: lorem.words(3),
    areaAtuacao: AreaAtuacao.PROFESSOR,
    frentes: [FrenteAtuacao.SESSAO_ACOLHIMENTO],
    especializacoes: lorem.words(3),
    tipo: TipoUsuario.ATENDENTE,
    bio: lorem.paragraphs(2),
  } as CreateVoluntarioDto;
  beforeEach(async () => {
    const moduleFixture = await getTestingModule([
      AuthModule.forRoot(),
      UsuarioModule,
      VoluntarioModule,
    ]);
    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  beforeEach(async () => {
    const connection = app.get(Connection);
    const voluntarioRepo = connection.getRepository(VoluntarioDbEntity);

    for (const [index, tipo] of [
      TipoUsuario.SUPERVISOR,
      TipoUsuario.ATENDENTE,
    ].entries()) {
      token = await getToken(app, tipo);
      await request(app.getHttpServer())
        .post('/cadastro-voluntario')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...voluntarioReq, tipo } as CreateVoluntarioDto);

      await voluntarioRepo.save({
        id: index + 1,
        aprovado: true,
      } as VoluntarioDbEntity);
    }
  });

  beforeEach(async () => {
    token = await getToken(app, TipoUsuario.ALUNO);
  });

  afterEach(async () => {
    await app.close();
  });
  describe('/voluntarios/listar/:tipo (GET)', () => {
    it('Deve listar os voluntários estando deslogado', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/voluntarios/listar/')
        .expect(HttpStatus.OK);
      expect(body).toHaveLength(2);
      const [voluntario] = body;
      expect(voluntario).toBeDefined();
    });

    it('Deve listar os voluntários estando logado', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/voluntarios/listar/')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK);
      expect(body).toHaveLength(2);
      const [voluntario] = body;
      expect(voluntario).toBeDefined();
    });

    it('Administradores devem ser capazes de ver mais campos', async () => {
      token = await getToken(app, TipoUsuario.ADMINISTRADOR);
      const { body } = await request(app.getHttpServer())
        .get('/voluntarios/listar/')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.OK);
      expect(body).toHaveLength(2);
      const [, atendente] = body;
      expect(atendente).toEqual(
        expect.objectContaining({
          semestre: expect.any(Number),
        } as VoluntarioOutput),
      );
    });

    it('Deve listar os voluntários de um tipo específico', async () => {
      const { body } = await request(app.getHttpServer())
        .get(`/voluntarios/listar/${TipoUsuario.ATENDENTE}`)
        .expect(HttpStatus.OK);

      expect(body).toHaveLength(1);
    });
  });
});
