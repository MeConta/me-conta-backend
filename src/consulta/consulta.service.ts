import { Injectable } from '@nestjs/common';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { DefaultService } from '../default.service';
import { Consulta } from './entities/consulta.entity';

@Injectable()
export class ConsultaService extends DefaultService(
  Consulta,
  CreateConsultaDto,
  UpdateConsultaDto,
) {}
