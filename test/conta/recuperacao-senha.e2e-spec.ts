import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestingModule } from '@nestjs/testing';
import { setupApp } from '../../src/config/app.config';
import { createUser, getTestingModule } from '../utils.test';
import * as request from 'supertest';
import { RecuperacaoModule } from '../../src/modules/recuperacao/recuperacao.module';
import { RecuperacaoDto } from '../../src/_adapters/recuperacao/dto/recuperacao.dto';
import { MailerMailService } from '../../src/_adapters/mail/services/mailer-mail.service';
import { createMock } from '@golevelup/ts-jest';
import { MailModule } from '../../src/mail/mail.module';
import { Usuario } from '../../src/_business/usuarios/entidades/usuario.entity';
import { UsuarioModule } from '../../src/modules/usuario/usuario.module';

describe('Recuperação de senha (e2e)', () => {
  let app: INestApplication;
  let user: Usuario;
  beforeEach(async () => {
    const moduleFixture: TestingModule = await getTestingModule(
      [UsuarioModule, MailModule, RecuperacaoModule],
      [
        {
          provide: MailerMailService,
          useValue: createMock<MailerMailService>(),
        },
      ],
    );

    app = moduleFixture.createNestApplication();
    setupApp(app);
    await app.init();
  });

  beforeEach(async () => {
    user = await createUser(app);
  });

  beforeEach(() => {
    jest.spyOn(MailerMailService.prototype, 'send').mockResolvedValue();
  });

  afterEach(async () => {
    await app.close();
  });
  describe('/senha/recuperacao (POST)', () => {
    it('Deve enviar um e-mail de recuperação', async () => {
      const { email } = user;
      await request(app.getHttpServer())
        .post('/senha/recuperacao')
        .send({
          email,
        } as RecuperacaoDto)
        .expect(HttpStatus.NO_CONTENT);
    });
  });
});
