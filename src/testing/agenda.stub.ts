import { CreateAgendaDto } from '../agenda/dto/create-agenda.dto';
import { Atendente } from '../atendente/entities/atendente.entity';
import { UpdateAgendaDto } from '../agenda/dto/update-agenda.dto';
import { Consulta } from '../consulta/entities/consulta.entity';
import { Agenda } from '../agenda/entities/agenda.entity';
import { AtendenteStub } from './atendente.stub';
import { ConsultaStub } from './consulta.stub';

export class AgendaStub {
  static getCreateDto(): CreateAgendaDto {
    return {
      data: new Date(),
      atendente: { id: 1 } as Atendente,
    };
  }

  static getUpdateDto(): UpdateAgendaDto {
    return {
      data: new Date(),
      consulta: { id: 1 } as Consulta,
    };
  }

  static getEntity(): Agenda {
    return {
      id: 1,
      data: new Date(),
      atendente: AtendenteStub.getEntity(),
      consulta: ConsultaStub.getEntity(),
      dataExclusao: new Date(),
      dataCriacao: new Date(),
      dataAlteracao: new Date(),
    };
  }
}
