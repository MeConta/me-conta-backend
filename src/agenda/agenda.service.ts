import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { DefaultService } from '../default.service';
import { Agenda } from './entities/agenda.entity';
import { FindConditions, In } from 'typeorm';
import { ConsultaService } from '../consulta/consulta.service';
import { Consulta } from '../consulta/entities/consulta.entity';

@Injectable()
export class AgendaService extends DefaultService(
  Agenda,
  CreateAgendaDto,
  UpdateAgendaDto,
) {
  @Inject(forwardRef(() => ConsultaService)) consultaService: ConsultaService;

  private async findConsultas(agendas: Agenda[]): Promise<Consulta[]> {
    return await this.consultaService.findAll({
      agenda: In(agendas.map((a) => a.id)),
    } as FindConditions<Consulta>);
  }

  async findAll(conditions?: FindConditions<Agenda>): Promise<Agenda[]> {
    const agendas = await super.findAll(conditions);

    const agendasMap = agendas.reduce((agendasMap, agenda) => {
      agendasMap[agenda.id] = agenda;
      return agendasMap;
    }, {});

    for (const consulta of await this.findConsultas(agendas)) {
      agendasMap[consulta.agenda.id].consulta = consulta;
    }
    return agendas;
  }

  async findOne(id: number): Promise<Agenda> {
    const agenda = await super.findOne(id);
    const consultas = await this.findConsultas([agenda]);

    agenda.consulta = consultas.find(() => true);
    return agenda;
  }
}
