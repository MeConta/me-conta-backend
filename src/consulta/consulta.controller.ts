import { Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { UpdateConsultaDto } from './dto/update-consulta.dto';
import { DefaultController } from '../default.controller';
import { Consulta } from './entities/consulta.entity';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Consulta')
@UseGuards(JwtAuthGuard)
export class ConsultaController extends DefaultController(
  'consulta',
  Consulta,
  ConsultaService,
  CreateConsultaDto,
  UpdateConsultaDto,
) {
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  create(@Body() dto: CreateConsultaDto): Promise<Consulta> {
    return super.create(dto);
  }

  @Patch(':id')
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  update(
    @Param('id') id: number,
    @Body() dto: UpdateConsultaDto,
  ): Promise<Consulta> {
    return super.update(id, dto);
  }
}
