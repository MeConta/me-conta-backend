import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { DefaultService } from '../default.service';
import { Consulta } from './entities/consulta.entity';
import { AlunoService } from '../aluno/aluno.service';
import { AgendaService } from '../agenda/agenda.service';
import { AtendenteService } from '../atendente/atendente.service';
import { Erros } from '../config/constants';

@Injectable()
export class ConsultaService extends DefaultService(
  Consulta,
  CreateConsultaDto,
  UpdateConsultaDto,
) {
  @Inject(AlunoService) private readonly alunoService: AlunoService;
  @Inject(AgendaService) private readonly agendaService: AgendaService;
  @Inject(AtendenteService) private readonly atendenteService: AtendenteService;

  async create(dto: CreateConsultaDto): Promise<Consulta> {
    try {
      return await super.create(dto);
    } catch (e) {
      throw new UnprocessableEntityException({
        details: {
          table: e.response.table,
          column: e.response.column,
        },
        message: Erros.NAO_ENCONTRADO,
      });
    }
  }
}
