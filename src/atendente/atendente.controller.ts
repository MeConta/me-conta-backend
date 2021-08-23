import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { AtendenteService } from './atendente.service';
import { CreateAtendenteDto } from './dto/create-atendente.dto';
import { UpdateAtendenteDto } from './dto/update-atendente.dto';
import { DefaultController } from '../default.controller';
import { Atendente } from './entities/atendente.entity';

export class AtendenteController extends DefaultController(
  'atendente',
  Atendente,
  AtendenteService,
  CreateAtendenteDto,
  UpdateAtendenteDto,
) {
  @Post()
  create(@Body() dto: CreateAtendenteDto) {
    return super.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAtendenteDto) {
    return super.update(id, dto);
  }
}
