import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { setupApp } from '../../src/config/app.config';
import { createUser, getTestingModule } from '../utils.test';
import * as request from 'supertest';
import { RecuperacaoModule } from '../../src/modules/recuperacao/recuperacao.module';
import { RecuperacaoDbEntity } from '../../src/_adapters/recuperacao/entidades/recuperacao.db.entity';
import { ResetSenhaInput } from '../../src/_business/recuperacao/casos-de-uso/reset-senha.feat';
import { DEFAULT_PASSWORD } from '../../jest.setup';
import { MailerMailService } from '../../src/_adapters/mail/services/mailer-mail.service';
import { Connection, Repository } from 'typeorm';
import * as moment from 'moment';
import { Usuario } from '../../src/_business/usuarios/entidades/usuario.entity';
import { UsuarioModule } from '../../src/modules/usuario/usuario.module';

describe('Reset de senha (e2e)', () => {
  let app: INestApplication;
  let recuperacaoRepo: Repository<RecuperacaoDbEntity>;
  let usuario: Usuario;
  let hash: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await getTestingModule([
      UsuarioModule,
      RecuperacaoModule,
    ]);

    app = await moduleFixture.createNestApplication();
    recuperacaoRepo = app
      .get(Connection)
      .getRepository<RecuperacaoDbEntity>(RecuperacaoDbEntity);

    setupApp(app);
    await app.init();
  });

  beforeEach(async () => {
    usuario = await createUser(app);
    hash = (
      await recuperacaoRepo.save(
        await recuperacaoRepo.create({
          usuario,
          hash: 'HASH',
          dataExpiracao: moment().add(7, 'days').toDate(),
        }),
      )
    ).hash;
  });
  beforeEach(async () => {
    const mailerService = app.get<MailerMailService>(MailerMailService);
    jest.spyOn(mailerService, 'send').mockImplementation(() => {
      return Promise.resolve();
    });
  });
  afterEach(async () => {
    await app.close();
  });
  describe('/senha/reset (POST)', () => {
    it('Deve alterar a senha com uma hash válida', async () => {
      await request(app.getHttpServer())
        .post('/senha/reset')
        .send({
          hash,
          senha: DEFAULT_PASSWORD,
        } as ResetSenhaInput)
        .expect(204);
    });
    it('Deve dar erro de Hash Não encontrada', async () => {
      await request(app.getHttpServer())
        .post('/senha/reset')
        .send({
          hash: 'hash_invalida',
          senha: DEFAULT_PASSWORD,
        } as ResetSenhaInput)
        .expect(404);
    });

    it('Deve dar erro de Hash Expirada', async () => {
      await recuperacaoRepo.save({
        id: usuario.id,
        hash,
        dataExpiracao: moment().subtract(1, 'day').toDate(),
      });
      await request(app.getHttpServer())
        .post('/senha/reset')
        .send({
          hash,
          senha: DEFAULT_PASSWORD,
        } as ResetSenhaInput)
        .expect(422);
    });
  });
});
