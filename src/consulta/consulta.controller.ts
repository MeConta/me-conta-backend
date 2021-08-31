import { Post, Body, Patch, Param } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { DefaultController } from '../default.controller';
import { Consulta } from './entities/consulta.entity';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Consulta')
export class ConsultaController extends DefaultController(
  'consulta',
  Consulta,
  ConsultaService,
  CreateConsultaDto,
  UpdateConsultaDto,
) {
  @Post()
  @ApiOkResponse({
    description: `Item Criado com sucesso`,
  })
  create(@Body() dto: CreateConsultaDto): Promise<Consulta> {
    return super.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: `Item Atualizado com sucesso`,
  })
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  update(
    @Param('id') id: number,
    @Body() dto: UpdateConsultaDto,
  ): Promise<Consulta> {
    return super.update(id, dto);
  }
}
