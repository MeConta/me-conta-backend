import { Supervisor } from '../supervisor/entities/supervisor.entity';
import { VoluntarioStub } from './voluntario.stub';
import { AreaAtuacao } from '../supervisor/entities/supervisor.enum';
import { AtendenteStub } from './atendente.stub';
import { CreateSupervisorDto } from '../supervisor/dto/create-supervisor.dto';
import { UpdateSupervisorDto } from '../supervisor/dto/update-supervisor.dto';
import { ConclusaoDto } from 'src/voluntario/dto/common/conclusao.dto';

export class SupervisorStub {
  static getEntity(): Supervisor {
    return {
      ...VoluntarioStub.getEntity(),
      crp: 'teste',
      areaAtuacao: AreaAtuacao.PROFESSOR,
      atendentes: AtendenteStub.getEntities(),
    };
  }

  static getCreateDto(): CreateSupervisorDto {
    return {
      ...VoluntarioStub.getCreateDto(),
      conclusao: {
        crp: 'teste',
        anoConclusao: 2020,
        especializacao: 'Semântica',
      } as ConclusaoDto,
      areaAtuacao: AreaAtuacao.PROFESSOR,
    };
  }

  static getUpdateDto(): UpdateSupervisorDto {
    return {
      atendentes: AtendenteStub.getEntities(),
    };
  }
}
