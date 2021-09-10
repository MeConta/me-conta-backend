import { Body, Param } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { DefaultController } from '../default.controller';
import { Consulta } from './entities/consulta.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth, PatchApi, PostApi } from '../decorators';

@ApiTags('Consulta')
export class ConsultaController extends DefaultController(
  'consulta',
  Consulta,
  ConsultaService,
  CreateConsultaDto,
  UpdateConsultaDto,
) {
  @PostApi()
  @Auth()
  create(@Body() dto: CreateConsultaDto): Promise<Consulta> {
    return super.create(dto);
  }

  @PatchApi()
  @Auth()
  update(
    @Param('id') id: number,
    @Body() dto: UpdateConsultaDto,
  ): Promise<Consulta> {
    return super.update(id, dto);
  }
}
