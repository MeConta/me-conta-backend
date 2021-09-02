import { Atendente } from '../atendente/entities/atendente.entity';
import { CreateAtendenteDto } from '../atendente/dto/create-atendente.dto';
import { VoluntarioStub } from './voluntario.stub';
import { UpdateAtendenteDto } from '../atendente/dto/update-atendente.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

export class AtendenteStub {
  static getCreateDto(): CreateAtendenteDto {
    return {
      ...VoluntarioStub.getCreateDto(),
      formado: true,
      semestre: 3,
      anoConclusao: 1994,
    };
  }

  static getUpdateDto(): UpdateAtendenteDto {
    return {
      supervisor: null,
      aprovado: true,
    };
  }

  static getEntity(): Atendente {
    return {
      ...VoluntarioStub.getEntity(),
      formado: true,
      semestre: 3,
      anoConclusao: 1994,
      supervisor: null,
      agendas: [],
    };
  }

  static getEntities(n = 1): Atendente[] {
    return Array<Atendente>().fill(this.getEntity(), n);
  }

  static getPaginatedEntities(n = 1): Pagination<Atendente> {
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
