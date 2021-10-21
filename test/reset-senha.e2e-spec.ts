import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { UsuarioDbEntity } from '../src/_adapters/usuarios/entidades/usuario.db.entity';
import { setupApp } from '../src/config/app.config';
import { createUser, getTestingModule } from './utils.test';
import * as request from 'supertest';
import { RecuperacaoModule } from '../src/recuperacao/recuperacao.module';
import { RecuperacaoDbEntity } from '../src/_adapters/recuperacao/entidades/recuperacao.db.entity';
import { ResetSenhaInput } from '../src/_business/recuperacao/casos-de-uso/reset-senha.feat';
import { DEFAULT_PASSWORD, MOCKED_SALT } from '../jest.setup';
import { MailE2EModule } from './modules/mail-e2e.module';
import { MailerMailService } from '../src/_adapters/mail/services/mailer-mail.service';
import { getConnection, Repository } from 'typeorm';
import { Usuario } from '../src/_business/usuarios/entidades/usuario.entity';
import * as moment from 'moment';

describe('Reset de senha (e2e)', () => {
  let app: INestApplication;
  let recuperacaoRepo: Repository<RecuperacaoDbEntity>;
  let hash: string;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await getTestingModule(
      [UsuarioDbEntity, RecuperacaoDbEntity],
      [MailE2EModule, RecuperacaoModule],
    );

    app = await moduleFixture.createNestApplication();

    setupApp(app);
    await app.init();
  });
  beforeEach(async () => {
    const mailerService = app.get<MailerMailService>(MailerMailService);
    jest.spyOn(mailerService, 'send').mockImplementation((args) => {
      console.log('Vai entrar aqui não?', args);
      return Promise.resolve();
    });

    const userRepo =
      getConnection().getRepository<UsuarioDbEntity>(UsuarioDbEntity);
    recuperacaoRepo =
      getConnection().getRepository<RecuperacaoDbEntity>(RecuperacaoDbEntity);
    const user = await createUser(app);
    const { id } = await userRepo.save(
      userRepo.create({
        ...user,
        salt: MOCKED_SALT,
        dataTermos: new Date(),
      } as Usuario),
    );
    hash = (
      await recuperacaoRepo.save(
        await recuperacaoRepo.create({
          usuario: { id } as Usuario,
          hash: 'hash',
          dataExpiracao: moment().add(7, 'days').toDate(),
        }),
      )
    ).hash;
  });
  afterEach(async () => {
    await app.close();
  });
  describe('/senha/reset (POST)', () => {
    beforeEach(async () => {
      await createUser(app);
    });
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
      await recuperacaoRepo.update(
        {
          hash: 'hash',
        },
        {
          dataExpiracao: moment().subtract(1, 'day').toDate(),
        },
      );
      await request(app.getHttpServer())
        .post('/senha/reset')
        .send({
          hash: 'hash',
          senha: DEFAULT_PASSWORD,
        } as ResetSenhaInput)
        .expect(422);
    });
  });
});
