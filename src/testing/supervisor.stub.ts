import { Supervisor } from '../supervisor/entities/supervisor.entity';
import { VoluntarioStub } from './voluntario.stub';
import { AreaAtuacao } from '../supervisor/entities/supervisor.enum';
import { AtendenteStub } from './atendente.stub';

export class SupervisorStub {
  static getEntity(): Supervisor {
    return {
      ...VoluntarioStub.getEntity(),
      crp: 'teste',
      areaAtuacao: AreaAtuacao.PROFESSOR,
      atendentes: AtendenteStub.getEntities(),
    };
  }
}
