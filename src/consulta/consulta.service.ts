import {
  forwardRef,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { DefaultService } from '../default.service';
import { Consulta } from './entities/consulta.entity';
import { AgendaService } from '../agenda/agenda.service';
import { Erros } from '../config/constants';

@Injectable()
export class ConsultaService extends DefaultService(
  Consulta,
  CreateConsultaDto,
  UpdateConsultaDto,
) {
  @Inject(forwardRef(() => AgendaService))
  private readonly agendaService: AgendaService;

  async create(dto: CreateConsultaDto): Promise<Consulta> {
    const agenda = await this.agendaService.findOne(dto.agenda.id);
    if (agenda?.consulta) {
      throw new UnprocessableEntityException({
        message: Erros.CONFLITO_DE_AGENDA,
      });
    }

    return super.create(dto);
  }
}
