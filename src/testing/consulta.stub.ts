import { CreateConsultaDto } from '../consulta/dto/create-consulta.dto';
import { UpdateConsultaDto } from '../consulta/dto/update-consulta.dto';
import { Agenda } from '../agenda/entities/agenda.entity';
import { Atendente } from '../atendente/entities/atendente.entity';
import { Aluno } from '../aluno/entities/aluno.entity';
import { TipoEscola } from '../aluno/entities/aluno.enum';

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
}
