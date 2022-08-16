import { HttpStatus, INestApplication } from '@nestjs/common';
import { DEFAULT_PHONE } from '../../jest.setup';
import * as dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import {
  Estado,
  Genero,
  Usuario,
} from '../../src/_business/usuarios/entidades/usuario.entity';
import { TipoUsuario } from '../../src/_business/usuarios/casos-de-uso/cadastrar-novo-usuario.feat';
import { CreateVoluntarioDto } from '../../src/_adapters/voluntarios/dto/create-voluntario.dto';
import { createUser, getTestingModule, getToken } from '../utils.test';
import * as request from 'supertest';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { UsuarioModule } from '../../src/modules/usuario/usuario.module';
import { VoluntarioModule } from '../../src/modules/voluntario/voluntario.module';
import { setupApp } from '../../src/config/app.config';
import { Connection } from 'typeorm';
import { VoluntarioDbEntity } from '../../src/_adapters/voluntarios/entidades/voluntario-db.entity';
import { AdminModule } from '../../src/modules/admin/admin.module';
import { AutorizarVoluntarioInputDto } from '../../src/modules/admin/voluntario/dto/autorizar-voluntario.dto';

describe('Aprovação de Voluntários (e2e)', () => {
  faker.setLocale('pt_BR');
  let app: INestApplication;
  let token: string;
  const voluntarioReq = {
    telefone: DEFAULT_PHONE,
    dataNascimento: dayjs().subtract(18, 'years').toDate(),
    cidade: faker.address.city(),
    UF: Estado.AC,
    genero: Genero.PREFIRO_NAO_DECLARAR,
    instituicao: faker.lorem.word(2),
    formado: false,
    semestre: 10,
    tipo: TipoUsuario.ATENDENTE,
  } as CreateVoluntarioDto;

  beforeEach(async () => {
    const moduleFixture = await getTestingModule([
      AuthModule,
      UsuarioModule,
      VoluntarioModule,
      AdminModule,
    ]);
    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  beforeEach(async () => {
    const connection = app.get(Connection);
    const voluntarioRepo = connection.getRepository(VoluntarioDbEntity);
    const { id } = await createUser(app);

    await voluntarioRepo.save(
      voluntarioRepo.create({
        ...voluntarioReq,
        usuario: { id } as Usuario,
      }),
    );
  });

  beforeEach(async () => {
    token = await getToken(app);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/admin/voluntarios/aprovar/:id', () => {
    it('Deve Aprovar um Voluntário', async () => {
      await request(app.getHttpServer())
        .patch('/admin/voluntarios/aprovar/1')
        .set('Authorization', `Bearer ${token}`)
        .send({
          aprovado: true,
          link: 'meet.google.com/huc-yrpy-nes',
        } as AutorizarVoluntarioInputDto)
        .expect(HttpStatus.NO_CONTENT);

      const repo = app.get(Connection).getRepository(VoluntarioDbEntity);
      const { aprovado } = await repo.findOne(1);
      expect(aprovado).toBeTruthy();
    });

    it('Deve dar Forbidden caso não seja um Administrador', async () => {
      token = await getToken(app, TipoUsuario.ALUNO);
      await request(app.getHttpServer())
        .patch('/admin/voluntarios/aprovar/1')
        .send({
          aprovado: true,
        } as AutorizarVoluntarioInputDto)
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.FORBIDDEN);
    });

    it('Deve dar Unauthorized caso não esteja logado', async () => {
      await request(app.getHttpServer())
        .patch('/admin/voluntarios/aprovar/1')
        .send({
          aprovado: true,
        } as AutorizarVoluntarioInputDto)
        .expect(HttpStatus.UNAUTHORIZED);
    });

    it('Deve dar Not Found caso o voluntário não exista', async () => {
      await request(app.getHttpServer())
        .patch('/admin/voluntarios/aprovar/999')
        .set('Authorization', `Bearer ${token}`)
        .send({
          aprovado: true,
          link: 'meet.google.com/huc-yrpy-nes',
        } as AutorizarVoluntarioInputDto)
        .expect(HttpStatus.NOT_FOUND);
    });

    it('Deve dar Bad Request caso o request esteja incorreto', async () => {
      await request(app.getHttpServer())
        .patch('/admin/voluntarios/aprovar/1')
        .set('Authorization', `Bearer ${token}`)
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
