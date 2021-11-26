import { TestingModule } from '@nestjs/testing';
import { getTestingModule } from '../utils.test';
import { AuthModule } from '../../src/modules/auth/auth.module';
import { UsuarioModule } from '../../src/modules/usuario/usuario.module';
import { VoluntarioModule } from '../../src/modules/voluntario/voluntario.module';
import { AgendaModule } from '../../src/modules/agenda/agenda.module';
import { setupApp } from '../../src/config/app.config';
import { INestApplication } from '@nestjs/common';

export async function agendaTestingApp(app: INestApplication) {
  const moduleFixture: TestingModule = await getTestingModule([
    AuthModule.forRoot(),
    UsuarioModule,
    VoluntarioModule,
    AgendaModule,
  ]);
  app = await moduleFixture.createNestApplication();
  setupApp(app);
  return app.init();
}
