import { CreateAgendaDto } from '../agenda/dto/create-agenda.dto';
import { Atendente } from '../atendente/entities/atendente.entity';
import { UpdateAgendaDto } from '../agenda/dto/update-agenda.dto';
import { Consulta } from '../consulta/entities/consulta.entity';
import { Agenda } from '../agenda/entities/agenda.entity';
import { AtendenteStub } from './atendente.stub';
import { Pagination } from 'nestjs-typeorm-paginate';

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
      consulta: null,
      dataExclusao: new Date(),
      dataCriacao: new Date(),
      dataAlteracao: new Date(),
    };
  }

  static getEntities(n = 1): Agenda[] {
    return Array<Agenda>(n).fill(this.getEntity());
  }

  static getPaginatedEntities(n = 1): Pagination<Agenda> {
    return new Pagination(this.getEntities(n), {
      currentPage: 1,
      itemCount: n,
      itemsPerPage: 10,
      totalItems: n,
      totalPages: 1,
    });
  }
}
