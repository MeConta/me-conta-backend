import { INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { UsuarioDbEntity } from '../src/_adapters/usuarios/entidades/usuario.db.entity';
import { setupApp } from '../src/config/app.config';
import { createUser, getTestingModule } from './utils.test';
import * as request from 'supertest';
import { CreateUsuarioDto } from '../src/_adapters/usuarios/dto/create-usuario.dto';
import { RecuperacaoModule } from '../src/recuperacao/recuperacao.module';
import { RecuperacaoDbEntity } from '../src/_adapters/recuperacao/entidades/recuperacao.db.entity';
import { RecuperacaoDto } from '../src/_adapters/recuperacao/dto/recuperacao.dto';
import { MailerMailService } from '../src/_adapters/mail/services/mailer-mail.service';
import { createMock } from '@golevelup/ts-jest';
import { MailModule } from '../src/mail/mail.module';
import { ConfigModule } from '@nestjs/config';

describe('Recuperação de senha (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await getTestingModule(
      [UsuarioDbEntity, RecuperacaoDbEntity],
      [ConfigModule, MailModule, RecuperacaoModule],
      [
        {
          provide: MailerMailService,
          useValue: createMock<MailerMailService>(),
        },
      ],
    );

    app = await moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });
  afterEach(async () => {
    await app.close();
  });
  describe('/senha/recuperacao (POST)', () => {
    let user: CreateUsuarioDto;
    beforeEach(async () => {
      user = await createUser(app);
    });
    it('Deve enviar um e-mail de recuperação', async () => {
      const { email } = user;
      await request(app.getHttpServer())
        .post('/senha/recuperacao')
        .send({
          email,
        } as RecuperacaoDto)
        .expect(204);
    });
  });
});
