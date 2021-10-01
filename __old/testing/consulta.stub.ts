import { CreateConsultaDto } from '../consulta/dto/create-consulta.dto';
import { UpdateConsultaDto } from '../consulta/dto/update-consulta.dto';
import { Agenda } from '../agenda/entities/agenda.entity';
import { Atendente } from '../atendente/entities/atendente.entity';
import { Aluno } from '../aluno/entities/aluno.entity';
import { TipoEscola } from '../aluno/entities/aluno.enum';
import { Consulta } from '../consulta/entities/consulta.entity';
import { AgendaStub } from './agenda.stub';
import { AlunoStub } from './aluno.stub';
import { Pagination } from 'nestjs-typeorm-paginate';

export class ConsultaStub {
  static getCreateDto(): CreateConsultaDto {
    return {
      aluno: {
        id: 1,
      } as Aluno,
      agenda: {
        id: 1,
      } as Agenda,
      atendente: {
        id: 1,
      } as Atendente,
    };
  }
  static getUpdateDto(): UpdateConsultaDto {
    return {
      aluno: {
        tipoEscola: TipoEscola.PUBLICA,
      } as Aluno,
    };
  }

  static getEntity(): Consulta {
    return {
      id: 1,
      agenda: AgendaStub.getEntity(),
      aluno: AlunoStub.getEntity(),
      dataAlteracao: new Date(),
      dataCriacao: new Date(),
      dataExclusao: new Date(),
    };
  }

  static getEntities(n = 1): Consulta[] {
    return Array(n).fill(this.getEntity());
  }

  static getPaginatedEntities(n = 1): Pagination<Consulta> {
    return {
      items: this.getEntities(n),
      meta: {
        currentPage: 1,
        itemCount: n,
        itemsPerPage: 10,
        totalItems: n,
        totalPages: 1,
      },
    };
  }
}
