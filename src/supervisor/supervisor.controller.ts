import { Body, Patch, Param, Post } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import { DefaultController } from '../default.controller';
import { Supervisor } from './entities/supervisor.entity';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Supervisor')
export class SupervisorController extends DefaultController(
  'supervisor',
  Supervisor,
  SupervisorService,
  CreateSupervisorDto,
  UpdateSupervisorDto,
) {
  @Post()
  @ApiOkResponse({
    description: `Item Criado com sucesso`,
  })
  create(@Body() dto: CreateSupervisorDto) {
    return super.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: `Item Atualizado com sucesso`,
  })
  @ApiNotFoundResponse({
    description: `Item não encontrado`,
  })
  update(@Param('id') id: number, @Body() dto: UpdateSupervisorDto) {
    return super.update(id, dto);
  }
}
