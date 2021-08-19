import { Post, Body, Patch, Param } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { DefaultController } from '../default.controller';
import { Consulta } from './entities/consulta.entity';

export class ConsultaController extends DefaultController(
  'consulta',
  Consulta,
  ConsultaService,
  CreateConsultaDto,
  UpdateConsultaDto,
) {
  @Post()
  create(@Body() dto: CreateConsultaDto): Promise<Consulta> {
    return super.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateConsultaDto,
  ): Promise<Consulta> {
    return super.update(id, dto);
  }
}
