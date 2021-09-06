import { Body, Patch, Param, Post, UseGuards } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import { DefaultController } from '../default.controller';
import { Supervisor } from './entities/supervisor.entity';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Supervisor')
@UseGuards(JwtAuthGuard)
export class SupervisorController extends DefaultController(
  'supervisor',
  Supervisor,
  SupervisorService,
  CreateSupervisorDto,
  UpdateSupervisorDto,
) {
  @Post()
  @ApiBadRequestResponse({
    description: `Requisição inválida`,
  })
  @ApiUnprocessableEntityResponse({
    description: `Violação de regra de negócio`,
  })
  async create(@Body() dto: CreateSupervisorDto): Promise<Supervisor> {
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
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateSupervisorDto,
  ): Promise<Supervisor> {
    return super.update(id, dto);
  }
}
