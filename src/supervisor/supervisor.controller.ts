import { Controller, Body, Patch, Param, Post } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import { DefaultController } from '../default.controller';
import { Supervisor } from './entities/supervisor.entity';

export class SupervisorController extends DefaultController(
  'supervisor',
  Supervisor,
  SupervisorService,
  CreateSupervisorDto,
  UpdateSupervisorDto,
) {
  @Post()
  create(@Body() dto: CreateSupervisorDto) {
    return super.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSupervisorDto) {
    return super.update(id, dto);
  }
}
