import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { DefaultService } from '../../default.service';
import { Agenda } from './entities/agenda.entity';
import { FindConditions, In } from 'typeorm';
import { ConsultaService } from '../consulta/consulta.service';
import { Consulta } from '../consulta/entities/consulta.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class AgendaService extends DefaultService(
  Agenda,
  CreateAgendaDto,
  UpdateAgendaDto,
) {
  @Inject(forwardRef(() => ConsultaService)) consultaService: ConsultaService;

  private async findConsultas(
    agendas: Agenda[],
  ): Promise<Pagination<Consulta>> {
    return this.consultaService.findAll(
      {
        page: 1,
        limit: 0,
      },
      {
        agenda: In(agendas.map((a) => a.id)),
      } as FindConditions<Consulta>,
    );
  }

  async findAll(
    pagination?: IPaginationOptions,
    conditions?: FindConditions<Agenda>,
  ): Promise<Pagination<Agenda>> {
    const agendas = await super.findAll(pagination, conditions);

    const agendasMap = agendas.items.reduce((map, agenda) => {
      map[agenda.id] = agenda;
      return map;
    }, {});

    const consultas = await this.findConsultas(agendas.items);
    for (const consulta of consultas.items) {
      agendasMap[consulta.agenda.id].consulta = consulta;
    }
    return agendas;
  }

  async findOne(id: number): Promise<Agenda> {
    const agenda = await super.findOne(id);
    const consultas = await this.findConsultas([agenda]);

    agenda.consulta = consultas.items.find(() => true);
    return agenda;
  }
}
