import { CreateConsultaDto } from '../consulta/dto/create-consulta.dto';
import { AlunoStub } from './aluno.stub';
import { UpdateConsultaDto } from '../consulta/dto/update-consulta.dto';

export class ConsultaStub {
  static getCreateDto(): CreateConsultaDto {
    return {
      aluno: AlunoStub.getEntity(),
      agenda: null,
      atendente: null,
    };
  }
  static getUpdateDto(): UpdateConsultaDto {
    return {
      aluno: AlunoStub.getEntity(),
    };
  }
}
