import { Atendente } from '../atendente/entities/atendente.entity';
import { CreateAtendenteDto } from '../atendente/dto/create-atendente.dto';
import { VoluntarioStub } from './voluntario.stub';
import { UpdateAtendenteDto } from '../atendente/dto/update-atendente.dto';

export class AtendenteStub {
  static getEntity(): Atendente {
    return {
      ...VoluntarioStub.getEntity(),
      formado: true,
      semestre: 3,
      anoFormacao: 1994,
      supervisor: null,
      agendas: [],
    };
  }

  static getCreateDto(): CreateAtendenteDto {
    return {
      ...VoluntarioStub.getCreateDto(),
      formado: true,
      semestre: 3,
      anoFormacao: 1994,
    };
  }

  static getUpdateDto(): UpdateAtendenteDto {
    return {
      ...AtendenteStub.getCreateDto(),
      anoFormacao: 1999,
      supervisor: null,
      aprovado: true,
    };
  }
}
