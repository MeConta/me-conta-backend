import { CreateConsultaDto } from '../consulta/dto/create-consulta.dto';
import { AlunoStub } from './aluno.stub';
import { UpdateConsultaDto } from '../consulta/dto/update-consulta.dto';
import {AtendenteStub} from "./atendente.stub";
import {Agenda} from "../agenda/entities/agenda.entity";
import {Atendente} from "../atendente/entities/atendente.entity";

export class ConsultaStub {
  static getCreateDto(): CreateConsultaDto {
    return {
      aluno: AlunoStub.getEntity(),
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
      aluno: AlunoStub.getEntity(),
    };
  }
}
