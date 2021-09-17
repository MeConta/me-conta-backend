import { Body, Param } from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import { DefaultController } from '../../default.controller';
import { Supervisor } from './entities/supervisor.entity';
import { ApiTags } from '@nestjs/swagger';
import { Auth, PatchApi, PostApi } from '../decorators';

@ApiTags('Supervisor')
export class SupervisorController extends DefaultController(
  'supervisor',
  Supervisor,
  SupervisorService,
  CreateSupervisorDto,
  UpdateSupervisorDto,
) {
  @PostApi()
  async create(@Body() dto: CreateSupervisorDto): Promise<Supervisor> {
    return super.create(dto);
  }

  @PatchApi()
  @Auth()
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateSupervisorDto,
  ): Promise<Supervisor> {
    return super.update(id, dto);
  }
}
